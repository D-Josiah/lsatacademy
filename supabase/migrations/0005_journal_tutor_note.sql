-- ============================================================================
-- Add journal_entries.tutor_note — David's note on a specific logged question.
--
-- The student writes their own notes (root_cause / takeaway); this column is the
-- tutor's reply/feedback on that question, shown to the student in their journal.
--
-- Students can already read their own journal rows (journal_select), so they see
-- the note. To let an ADMIN write it we add an admin UPDATE policy — the existing
-- journal_update_own only allows the owning student to update.
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.journal_entries
  add column if not exists tutor_note text;

drop policy if exists journal_update_admin on public.journal_entries;
create policy journal_update_admin on public.journal_entries
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());
