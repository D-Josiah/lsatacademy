-- ============================================================================
-- Add journal_entries.source_label — where a logged question came from.
--
-- LawHub entries store 'LawHub' (and are classified from the Drill Finder bank);
-- "Other" entries store whatever the student typed (a book, 7Sage, a tutor drill).
--
-- Covered by the existing journal RLS (student insert/update own; admin update).
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.journal_entries
  add column if not exists source_label text;
