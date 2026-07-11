-- ============================================================================
-- Add profiles.miro_url — the student's Miro board link.
--
-- Replaces the temporary shared placeholder whiteboard URL with a per-student
-- board. Admins set it on the student detail page; "View Miro board" appears
-- once a URL is saved. Only admins can write it (profiles_update_admin).
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.profiles
  add column if not exists miro_url text;
