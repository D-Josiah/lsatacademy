-- ============================================================================
-- Add journal_entries.discuss_with_tutor — a student flag meaning "go over this
-- with my tutor next session".
--
-- The Wrong Answer Journal is already visible to the tutor (admin reads it on
-- the student detail page). This flag lets the student mark specific entries to
-- discuss. Defaults to false.
--
-- Reads use select('*'), so the app keeps working before this is applied; the
-- flag just stays off until the column exists. Writes (toggling the flag) need
-- the column, so apply this to enable the feature.
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.journal_entries
  add column if not exists discuss_with_tutor boolean not null default false;
