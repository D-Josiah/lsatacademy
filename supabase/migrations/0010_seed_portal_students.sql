-- ============================================================================
-- Seed portal student accounts + their meetings (one-on-one / pay-as-you-go).
-- ============================================================================
-- Generated from the Calendly export + each context/portal/<Name>/ recap-link CSV.
-- Creates each auth user (idempotent), sets the profile (meeting_credits = 0 ->
-- adjust to real remaining; no package), and seeds every meeting. Recap recording
-- links are stored in calendly_event_uri where available (portal shows
-- "View recap"); the rest show "No recap".
--
-- Idempotent: users skipped if they exist; meetings keyed on calendly_event_uri.
-- Safe to re-run.
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

-- Create one confirmed email/password user + identity (same helper as seed-users.sql).
create or replace function public.seed_user(p_email text, p_password text, p_full_name text)
returns void language plpgsql security definer set search_path = auth, public, extensions as $$
declare uid uuid := gen_random_uuid();
begin
  if exists (select 1 from auth.users where email = lower(p_email)) then
    raise notice 'skip: % already exists', p_email; return;
  end if;
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data,
    confirmation_token, recovery_token, email_change_token_new, email_change
  ) values (
    '00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated',
    lower(p_email), crypt(p_password, gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('full_name', p_full_name), '', '', '', ''
  );
  insert into auth.identities (
    provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) values (
    uid, uid, jsonb_build_object('sub', uid::text, 'email', lower(p_email), 'email_verified', true),
    'email', now(), now(), now()
  );
end; $$;

-- Clear prior SEEDED meetings for these students before re-seeding, so changing
-- a meeting's key (e.g. event id -> recap link) can't leave duplicates. Only
-- recap-less rows are removed; meetings where David typed a recap are preserved.
delete from public.meetings m
using public.profiles p
where m.student_id = p.id
  and m.recap is null
  and lower(p.email) in (
    'laurenhlcho@gmail.com', 'ritaawad743@g.ucla.edu', 'arushisx@gmail.com',
    'gmharris242@gmail.com', 'naomiy2k@gmail.com', 'angelakintoye@gmail.com',
    'joannaspyratos1@gmail.com', 'dalisayjosiah00@gmail.com'
  );

-- ---------------------------------------------------------------------------
-- Lauren Cho
-- ---------------------------------------------------------------------------
select public.seed_user('laurenhlcho@gmail.com', 'LsatStudent#2026', 'Lauren Cho');
update public.profiles set full_name = 'Lauren Cho', meeting_credits = 0
where lower(email) = 'laurenhlcho@gmail.com';

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2025-11-26 14:30:00-05:00'::timestamptz, '2025-11-26 15:30:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/6d5ac5f1-cd96-49fe-8555-719913e1b4f4'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2025-12-09 17:00:00-05:00'::timestamptz, '2025-12-09 18:30:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/9982abbb-d027-4b4d-9537-b28c9b7188e9'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2025-12-12 16:00:00-05:00'::timestamptz, '2025-12-12 17:30:00-05:00'::timestamptz, 'completed', null, '998ac929-7075-4891-b9a1-3817ab9a09d2'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2025-12-14 11:00:00-05:00'::timestamptz, '2025-12-14 12:30:00-05:00'::timestamptz, 'completed', null, 'c39370b9-1ca4-4197-b5cb-df213d4e1960'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-02-03 12:00:00-05:00'::timestamptz, '2026-02-03 13:00:00-05:00'::timestamptz, 'completed', null, '25e7534f-ea01-412d-aa81-0adc78f92e60'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-02-12 15:30:00-05:00'::timestamptz, '2026-02-12 16:30:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/345a9309-71b1-48f9-84fa-a6a05f64079a'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-02-26 15:00:00-05:00'::timestamptz, '2026-02-26 16:00:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/345a9309-71b1-48f9-84fa-a6a05f64079a#2'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-05 15:30:00-05:00'::timestamptz, '2026-03-05 16:30:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/90238d65-db58-438d-8b7f-c3a0054ea387'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-13 11:00:00-04:00'::timestamptz, '2026-03-13 12:00:00-04:00'::timestamptz, 'completed', null, '1eebfadc-67da-439d-909e-a8fb4c8a3f59'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-19 15:30:00-04:00'::timestamptz, '2026-03-19 16:30:00-04:00'::timestamptz, 'completed', null, '38f699ea-f5bc-4bfe-be8c-12047a47f08c'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-24 13:30:00-04:00'::timestamptz, '2026-03-24 14:30:00-04:00'::timestamptz, 'completed', null, '141d6972-bd22-4657-8dd9-c8d024884966'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-31 15:00:00-04:00'::timestamptz, '2026-03-31 16:00:00-04:00'::timestamptz, 'completed', null, '7a9feb12-4ae8-4d9e-96e3-6594b79c9259'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-04-05 11:30:00-04:00'::timestamptz, '2026-04-05 12:30:00-04:00'::timestamptz, 'completed', null, '350a2111-abbc-4b93-bfbd-491b6cdaff04'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-04-30 12:00:00-04:00'::timestamptz, '2026-04-30 13:00:00-04:00'::timestamptz, 'completed', null, '81bcb815-764e-40cb-8bd1-42fb2bb47ed6'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-05-08 11:30:00-04:00'::timestamptz, '2026-05-08 12:30:00-04:00'::timestamptz, 'completed', null, '2ad8da96-937d-4eee-8f94-6e20237b6652'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-05-13 11:30:00-04:00'::timestamptz, '2026-05-13 12:30:00-04:00'::timestamptz, 'completed', null, '2d54439a-4800-4579-bd53-4d4ff1711627'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-06-02 12:00:00-04:00'::timestamptz, '2026-06-02 13:00:00-04:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/898ab58b-5de3-4934-ada5-fe68bd384f31'
from public.profiles p where lower(p.email) = 'laurenhlcho@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

-- ---------------------------------------------------------------------------
-- Rita Awad
-- ---------------------------------------------------------------------------
select public.seed_user('ritaawad743@g.ucla.edu', 'LsatStudent#2026', 'Rita Awad');
update public.profiles set full_name = 'Rita Awad', meeting_credits = 0
where lower(email) = 'ritaawad743@g.ucla.edu';

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2025-09-28 23:00:00-04:00'::timestamptz, '2025-09-29 00:00:00-04:00'::timestamptz, 'completed', null, '35413fd1-d4d6-4c1f-8e39-c61c6ebd364e'
from public.profiles p where lower(p.email) = 'ritaawad743@g.ucla.edu'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-05-04 16:00:00-04:00'::timestamptz, '2026-05-04 17:00:00-04:00'::timestamptz, 'completed', null, '91f241f1-76f6-4db7-bf07-278984dd640c'
from public.profiles p where lower(p.email) = 'ritaawad743@g.ucla.edu'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-05-13 15:30:00-04:00'::timestamptz, '2026-05-13 16:30:00-04:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/e5583634-8a6c-4344-bcee-239d4c90ed86'
from public.profiles p where lower(p.email) = 'ritaawad743@g.ucla.edu'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-05-20 14:00:00-04:00'::timestamptz, '2026-05-20 15:00:00-04:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/7ec2554a-3dfa-4db6-bf5e-9c6be714a173'
from public.profiles p where lower(p.email) = 'ritaawad743@g.ucla.edu'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-05-27 14:00:00-04:00'::timestamptz, '2026-05-27 15:00:00-04:00'::timestamptz, 'completed', null, '09153fc6-faac-427e-93de-0086c6e4cce7'
from public.profiles p where lower(p.email) = 'ritaawad743@g.ucla.edu'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-05-29 13:00:00-04:00'::timestamptz, '2026-05-29 14:00:00-04:00'::timestamptz, 'completed', null, 'dc5ee04f-44c5-4a23-a52b-c9d1c860ef91'
from public.profiles p where lower(p.email) = 'ritaawad743@g.ucla.edu'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-06-10 14:00:00-04:00'::timestamptz, '2026-06-10 15:00:00-04:00'::timestamptz, 'completed', null, '8912b35a-5138-4e94-9123-bcc90d5677c3'
from public.profiles p where lower(p.email) = 'ritaawad743@g.ucla.edu'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

-- ---------------------------------------------------------------------------
-- Arushi Saxena
-- ---------------------------------------------------------------------------
select public.seed_user('arushisx@gmail.com', 'LsatStudent#2026', 'Arushi Saxena');
update public.profiles set full_name = 'Arushi Saxena', meeting_credits = 0
where lower(email) = 'arushisx@gmail.com';

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2025-12-15 14:30:00-05:00'::timestamptz, '2025-12-15 15:30:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/633e396b-e862-4b5b-b704-3ceb0fcf5e06'
from public.profiles p where lower(p.email) = 'arushisx@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-06-06 00:00:00+00'::timestamptz, null::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/02e6fe2f-98e0-4768-b640-fd71293c4a4d'
from public.profiles p where lower(p.email) = 'arushisx@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

-- ---------------------------------------------------------------------------
-- Grace Harris
-- ---------------------------------------------------------------------------
select public.seed_user('gmharris242@gmail.com', 'LsatStudent#2026', 'Grace Harris');
update public.profiles set full_name = 'Grace Harris', meeting_credits = 0
where lower(email) = 'gmharris242@gmail.com';

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-02-25 11:00:00-05:00'::timestamptz, '2026-02-25 12:00:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/937401c9-ae57-4a89-96f6-50963d41f50b'
from public.profiles p where lower(p.email) = 'gmharris242@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-04 21:00:00-05:00'::timestamptz, '2026-03-04 22:00:00-05:00'::timestamptz, 'completed', null, '42ced53a-d398-44b5-a01e-0f06a07c4296'
from public.profiles p where lower(p.email) = 'gmharris242@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-11 11:00:00-04:00'::timestamptz, '2026-03-11 12:00:00-04:00'::timestamptz, 'completed', null, '8bb23399-7b0b-4094-9c13-16d7940e1bc1'
from public.profiles p where lower(p.email) = 'gmharris242@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-17 17:00:00-04:00'::timestamptz, '2026-03-17 18:00:00-04:00'::timestamptz, 'completed', null, '564d7f19-3816-4a27-87cc-e7b3f2d2451c'
from public.profiles p where lower(p.email) = 'gmharris242@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-03-25 11:00:00-04:00'::timestamptz, '2026-03-25 12:00:00-04:00'::timestamptz, 'completed', null, 'd9631f4a-6c7e-484d-8ecd-e180f6ec5208'
from public.profiles p where lower(p.email) = 'gmharris242@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

-- ---------------------------------------------------------------------------
-- Naomi Nguyen
-- ---------------------------------------------------------------------------
select public.seed_user('naomiy2k@gmail.com', 'LsatStudent#2026', 'Naomi Nguyen');
update public.profiles set full_name = 'Naomi Nguyen', meeting_credits = 0
where lower(email) = 'naomiy2k@gmail.com';

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-01-27 17:00:00-05:00'::timestamptz, '2026-01-27 18:00:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/af690855-f7db-4d4e-b515-a461baf44712'
from public.profiles p where lower(p.email) = 'naomiy2k@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-02-24 15:00:00-05:00'::timestamptz, '2026-02-24 16:00:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/937401c9-ae57-4a89-96f6-50963d41f50b#2'
from public.profiles p where lower(p.email) = 'naomiy2k@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-02-27 17:15:00-05:00'::timestamptz, '2026-02-27 19:00:00-05:00'::timestamptz, 'completed', null, '81649e0c-dda1-4ba1-8509-ec3084866d09'
from public.profiles p where lower(p.email) = 'naomiy2k@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

-- ---------------------------------------------------------------------------
-- Angel Akintoye
-- ---------------------------------------------------------------------------
select public.seed_user('angelakintoye@gmail.com', 'LsatStudent#2026', 'Angel Akintoye');
update public.profiles set full_name = 'Angel Akintoye', meeting_credits = 0
where lower(email) = 'angelakintoye@gmail.com';

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-03-04 15:00:00-05:00'::timestamptz, '2026-03-04 16:00:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/03a13ea2-aab5-4cdc-8cb8-5a2137729719'
from public.profiles p where lower(p.email) = 'angelakintoye@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-03-07 15:30:00-05:00'::timestamptz, '2026-03-07 16:30:00-05:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/2cc17687-8a4a-4850-987d-801cb4271ee6'
from public.profiles p where lower(p.email) = 'angelakintoye@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-05-12 17:00:00-04:00'::timestamptz, '2026-05-12 18:00:00-04:00'::timestamptz, 'completed', null, 'ed326515-7488-40ae-a122-5344cc2315d0'
from public.profiles p where lower(p.email) = 'angelakintoye@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

-- ---------------------------------------------------------------------------
-- Joanna Spyratos
-- ---------------------------------------------------------------------------
select public.seed_user('joannaspyratos1@gmail.com', 'LsatStudent#2026', 'Joanna Spyratos');
update public.profiles set full_name = 'Joanna Spyratos', meeting_credits = 0
where lower(email) = 'joannaspyratos1@gmail.com';

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Free consultation', '2026-05-19 14:30:00-04:00'::timestamptz, '2026-05-19 15:30:00-04:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/e9306f55-ccf3-4855-9fe3-c3770ffa4032'
from public.profiles p where lower(p.email) = 'joannaspyratos1@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-05-30 12:30:00-04:00'::timestamptz, '2026-05-30 13:30:00-04:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/913590c4-14a3-454b-afc5-fc85c77c773b'
from public.profiles p where lower(p.email) = 'joannaspyratos1@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

insert into public.meetings (student_id, title, scheduled_at, ended_at, status, recap, calendly_event_uri)
select p.id, 'Private tutoring', '2026-06-03 21:00:00-04:00'::timestamptz, '2026-06-03 22:00:00-04:00'::timestamptz, 'completed', null, 'https://calendly.com/s/meetings/913590c4-14a3-454b-afc5-fc85c77c773b#2'
from public.profiles p where lower(p.email) = 'joannaspyratos1@gmail.com'
on conflict (calendly_event_uri) do update
  set title = excluded.title, scheduled_at = excluded.scheduled_at, ended_at = excluded.ended_at, status = excluded.status;

-- ---------------------------------------------------------------------------
-- Josiah Dalisay (account only — no meetings)
-- ---------------------------------------------------------------------------
select public.seed_user('dalisayjosiah00@gmail.com', 'LsatStudent#2026', 'Josiah Dalisay');
update public.profiles set full_name = 'Josiah Dalisay', meeting_credits = 0
where lower(email) = 'dalisayjosiah00@gmail.com';

-- Verify everyone seeded here.
select p.full_name, count(m.id) as meetings,
       count(*) filter (where m.calendly_event_uri like 'http%') as with_recap
from public.profiles p
left join public.meetings m on m.student_id = p.id
where lower(p.email) in ('laurenhlcho@gmail.com', 'ritaawad743@g.ucla.edu', 'arushisx@gmail.com', 'gmharris242@gmail.com', 'naomiy2k@gmail.com', 'angelakintoye@gmail.com', 'joannaspyratos1@gmail.com', 'dalisayjosiah00@gmail.com')
group by p.full_name order by p.full_name;
