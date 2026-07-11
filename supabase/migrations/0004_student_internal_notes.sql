-- ============================================================================
-- Admin-only internal notes about a student.
--
-- These are PRIVATE coaching notes the tutor keeps about a student — the student
-- must never see them. They can't live on public.profiles: profiles_select lets
-- a student read their own row (id = auth.uid()), and RLS is row-level (not
-- column-level), so any column on profiles would be readable by that student.
-- A dedicated table with an admin-only policy keeps them private.
--
-- One row per student (upserted on save).
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

create table if not exists public.student_internal_notes (
  student_id uuid primary key references public.profiles(id) on delete cascade,
  body       text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

alter table public.student_internal_notes enable row level security;

-- Only admins may read or write. Students get NOTHING (no select policy for them).
drop policy if exists internal_notes_admin_all on public.student_internal_notes;
create policy internal_notes_admin_all on public.student_internal_notes
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
