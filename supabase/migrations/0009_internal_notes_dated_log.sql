-- ============================================================================
-- Convert student_internal_notes from one upserted row per student into a dated
-- LOG: multiple entries per student, each with its own id + created_at.
--
-- 0004 created it with student_id as the primary key (one row, upserted). This
-- drops that PK so a student can have many notes, adds a surrogate id + a
-- created_at timestamp, and indexes student_id for the per-student lookup.
-- RLS (admin-only, from 0004) still applies.
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.student_internal_notes
  drop constraint if exists student_internal_notes_pkey;

alter table public.student_internal_notes
  add column if not exists id uuid primary key default gen_random_uuid();

alter table public.student_internal_notes
  add column if not exists created_at timestamptz not null default now();

create index if not exists idx_student_internal_notes_student
  on public.student_internal_notes (student_id);
