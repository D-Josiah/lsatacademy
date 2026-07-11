-- ============================================================================
-- Add profiles.status — a manual Active / Inactive flag set by admins.
--
-- Shown as a tag on the admin student list and the student detail page. Admins
-- toggle it by hand (e.g. mark a student inactive when they pause tutoring).
-- Defaults to 'active'. Only admins can write it (existing profiles_update_admin
-- policy is is_admin()-gated and not column-restricted).
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.profiles
  add column if not exists status text not null default 'active'
  check (status in ('active', 'inactive'));
