-- ============================================================================
-- Add meetings.credit_consumed — did this booking actually spend a credit?
--
-- The Calendly webhook decrements a credit on invitee.created ONLY when the
-- student had one to spend, and refunds on invitee.canceled ONLY if one was
-- actually consumed. Without this flag, cancelling a booking made with 0 credits
-- would wrongly hand the student a credit they never had.
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.meetings
  add column if not exists credit_consumed boolean not null default false;
