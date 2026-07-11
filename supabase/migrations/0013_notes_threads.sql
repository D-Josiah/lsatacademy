-- ============================================================================
-- Threaded notes: a note can be a reply to another, and either David or the
-- student can resolve the thread.
--
--   - parent_id NULL          -> a thread root
--   - parent_id = <root id>   -> a reply in that thread
--   - resolved (on the root)  -> whole thread open/closed
--
-- Students may already insert their own notes (author_role='student') and read
-- their own. To let them REPLY they just insert with a parent_id (allowed by the
-- existing notes_insert_student policy). To let them RESOLVE we add a student
-- UPDATE policy — but RLS is row-level, so we pair it with a trigger that blocks
-- a non-admin from changing anything except `resolved` (so they can't rewrite
-- David's note body, reassign authorship, re-parent, etc.).
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

-- notes.id is bigint (identity), so parent_id must be bigint to reference it.
alter table public.notes
  add column if not exists parent_id bigint references public.notes(id) on delete cascade;

-- Thread state lives on the root note. Either side can flip it (guarded below).
alter table public.notes
  add column if not exists resolved boolean not null default false;

create index if not exists notes_parent_idx on public.notes (parent_id);

-- Let a student resolve/reopen a thread on their own record.
drop policy if exists notes_update_student on public.notes;
create policy notes_update_student on public.notes
  for update to authenticated
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

-- A non-admin may ONLY change `resolved` on an UPDATE.
create or replace function public.notes_block_protected_cols()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    if new.body        is distinct from old.body
       or new.author_id   is distinct from old.author_id
       or new.author_role is distinct from old.author_role
       or new.student_id  is distinct from old.student_id
       or new.parent_id   is distinct from old.parent_id then
      raise exception 'A non-admin may only change resolved on a note.';
    end if;
  end if;
  return new;
end $$;

drop trigger if exists notes_protect_cols on public.notes;
create trigger notes_protect_cols
  before update on public.notes
  for each row execute function public.notes_block_protected_cols();
