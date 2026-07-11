-- ============================================================================
-- RLS policy snapshot for the student portal + admin panel.
--
-- This file documents the RLS policies that ALREADY EXIST in production (pulled
-- from pg_policies on 2026-06-08) so they are reviewable in version control —
-- which they previously were not (see SECURITY-AUDIT.md SEC-001).
--
-- It is written to be idempotent (drop-if-exists then create) so it can also
-- rebuild the policies on a fresh environment. On the live DB the policies are
-- already present, so re-applying is a no-op rebuild.
--
-- NOTE: the dangerous `profiles_update_self` policy that used to exist here is
-- intentionally NOT recreated — it is removed by 0002_fix_profiles_self_update.sql.
--
-- All Edge Functions (admin-create-student, calendly-webhook) and the
-- on_auth_user_created trigger use the SERVICE ROLE / SECURITY DEFINER, which
-- bypasses RLS, so these policies do not affect them.
-- ============================================================================

-- Helper: is the current user an admin? SECURITY DEFINER so it can read the
-- profiles.role without recursing through profiles' own RLS.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists profiles_select        on public.profiles;
drop policy if exists profiles_insert_admin   on public.profiles;
drop policy if exists profiles_update_admin   on public.profiles;
drop policy if exists profiles_delete_admin   on public.profiles;
-- profiles_update_self deliberately omitted (removed in 0002).

create policy profiles_select on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy profiles_insert_admin on public.profiles
  for insert to authenticated
  with check (public.is_admin());

create policy profiles_update_admin on public.profiles
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy profiles_delete_admin on public.profiles
  for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- meetings
-- ---------------------------------------------------------------------------
alter table public.meetings enable row level security;

drop policy if exists meetings_select        on public.meetings;
drop policy if exists meetings_write_admin    on public.meetings;

create policy meetings_select on public.meetings
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin());

create policy meetings_write_admin on public.meetings
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- notes
-- ---------------------------------------------------------------------------
alter table public.notes enable row level security;

drop policy if exists notes_select          on public.notes;
drop policy if exists notes_insert_student   on public.notes;
drop policy if exists notes_insert_admin     on public.notes;
drop policy if exists notes_update_admin     on public.notes;
drop policy if exists notes_delete           on public.notes;

create policy notes_select on public.notes
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin());

create policy notes_insert_student on public.notes
  for insert to authenticated
  with check (
    student_id = auth.uid()
    and author_id = auth.uid()
    and author_role = 'student'
  );

create policy notes_insert_admin on public.notes
  for insert to authenticated
  with check (public.is_admin());

create policy notes_update_admin on public.notes
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy notes_delete on public.notes
  for delete to authenticated
  using (author_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- journal_entries
-- ---------------------------------------------------------------------------
alter table public.journal_entries enable row level security;

drop policy if exists journal_select       on public.journal_entries;
drop policy if exists journal_insert_own    on public.journal_entries;
drop policy if exists journal_update_own     on public.journal_entries;
drop policy if exists journal_delete_own     on public.journal_entries;

create policy journal_select on public.journal_entries
  for select to authenticated
  using (student_id = auth.uid() or public.is_admin());

create policy journal_insert_own on public.journal_entries
  for insert to authenticated
  with check (student_id = auth.uid());

create policy journal_update_own on public.journal_entries
  for update to authenticated
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

create policy journal_delete_own on public.journal_entries
  for delete to authenticated
  using (student_id = auth.uid() or public.is_admin());
