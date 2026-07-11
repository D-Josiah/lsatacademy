-- ============================================================================
-- Add notes.resolved — an admin "handled this note" flag.
--
-- Notes go both ways (tutor -> student, student -> tutor). Marking one resolved
-- lets the admin track which still need action. The admin student list shows the
-- per-student count of UNRESOLVED notes, and the Notes tab badge shows the same.
--
-- Apply:  supabase db push   (or paste into the SQL editor)
-- ============================================================================

alter table public.notes
  add column if not exists resolved boolean not null default false;
