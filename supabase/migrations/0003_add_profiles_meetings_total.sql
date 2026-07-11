-- ============================================================================
-- Add profiles.meetings_total — the size of a student's purchased package.
--
-- The portal shows "remaining / total" on the Sessions tab (e.g. 8/10).
-- `meeting_credits` already tracks the remaining sessions; this column adds the
-- denominator (the total package size). Defaults to 0 = "no package set", in
-- which case the portal just shows the remaining number with no "/total".
--
-- Only admins can write it (covered by the existing profiles_update_admin
-- policy, which is_admin()-gated and not column-restricted).
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.profiles
  add column if not exists meetings_total integer not null default 0
  check (meetings_total >= 0);

-- ----------------------------------------------------------------------------
-- OPTIONAL data backfill — set a student's package size + remaining. This is
-- data, not schema, so adjust/remove as needed. Example: Sydney has a 10-session
-- package with 8 left (her first consult was free).
-- ----------------------------------------------------------------------------
-- update public.profiles
--   set meetings_total = 10, meeting_credits = 8
--   where lower(email) = 'sswanson@hmc.edu';
