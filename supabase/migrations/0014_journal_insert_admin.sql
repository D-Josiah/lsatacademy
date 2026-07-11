-- ============================================================================
-- Let an admin log a journal entry on a student's behalf (e.g. during a session).
--
-- journal_insert_own only lets the owning student insert their own rows. This
-- adds an admin insert path so David can log a question for a student from the
-- admin Journal tab. (journal_update_admin already exists from 0005 for the
-- tutor_note feature.)
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

drop policy if exists journal_insert_admin on public.journal_entries;
create policy journal_insert_admin on public.journal_entries
  for insert to authenticated
  with check (public.is_admin());
