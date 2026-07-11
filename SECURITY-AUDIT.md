# Security Audit — LSAT Academy

**Scope:** Vite + React SPA (deploys to Vercel) with a Supabase backend (Auth + Postgres + 2 Edge Functions). Audit covered the student portal, admin panel, Wrong Answer Journal, Drill Finder, Calendly webhook, the admin-create-student function, and all client data access.
**Date:** 2026-06-08 · **Status:** remediation applied in the working tree (2026-06-08). See the table below.

## Remediation status

| ID | Severity | Status | What was done | Needs YOU to finish |
|---|---|---|---|---|
| **SEC-008** | **Critical** | **Fix written (`0002`)** | **NEW — found by reviewing live policies.** `profiles_update_self` let a student set their own `role='admin'` (full takeover) or `meeting_credits=999` (steal sessions). `0002_fix_profiles_self_update.sql` drops it. | **Apply `0002`** (`supabase db push`). |
| SEC-001 | Critical | **RESOLVED** | Live RLS confirmed **enabled** (`relrowsecurity = true`) on all four tables, with correctly-scoped policies (apart from SEC-008). Captured in `0001_rls_policies.sql`; student reads also filter `student_id` (defense-in-depth). `drill_questions` confirmed correct (anon SELECT only). | Apply `0002` to close SEC-008 — then this whole area is done. |
| SEC-009 | Low (latent) | **Documented** | `DrillFinder.jsx:648` inserts "report a problem" feedback into `drill_reviews` via the **anonymous** client. The table doesn't exist yet, so the feature is inert/broken — but if created with an unguarded `anon` INSERT policy it becomes an unauthenticated free-text write (spam) endpoint. | When you create `drill_reviews`: enable RLS, give `anon` **INSERT only** (no SELECT), and add a honeypot/captcha or move the write behind an Edge Function. Or remove the unused review feature. |
| SEC-002 | High | **Fixed** | `calendly-webhook` now **fails closed** when `CALENDLY_SIGNING_KEY` is unset (was `return true`). | **Set `CALENDLY_SIGNING_KEY`** as a function secret, then redeploy — otherwise the webhook will reject every Calendly event. |
| SEC-003 | High | **Verified — already safe** | Live policies confirmed correct: `notes_insert_student` pins `student_id`/`author_id` and forces `author_role='student'`; journal/meetings inserts are ownership-checked. No change needed. | — |
| SEC-004 | Low | **Fixed** | `admin-create-student` CORS now reflects only an origin allowlist (env `ALLOWED_ORIGINS`), no longer `*`. | Redeploy the function; add any preview/staging origins to `ALLOWED_ORIGINS`. |
| SEC-005 | Low | **Fixed** | Webhook signature compare is now constant-time; header parsing hardened. | Redeploy the function. |
| SEC-006 | Low | **Mitigated** | Contact form got a honeypot + min-time-to-submit. | Set **allowed origins / rate limits in the EmailJS dashboard** for real protection. |
| SEC-007 | Low | **Fixed** | `.gitignore` now ignores `.env` / `.env.*` (keeps `.env.example`). | — |

> **Could not be done from here:** applying the SQL migration, setting `CALENDLY_SIGNING_KEY`, redeploying the two Edge Functions, and the EmailJS dashboard config all require your Supabase/EmailJS access. The "Needs YOU to finish" column is the complete list.

The original findings, evidence, and reasoning follow unchanged for reference.

---

## Summary

The app's entire data-access security rests on Supabase Row Level Security (RLS). Every authenticated screen — Portal, Journal, Admin — reads `profiles` / `meetings` / `notes` / `journal_entries` **with no ownership filter in the query**, trusting RLS alone to scope rows to the right user. The route guards (`ProtectedRoute`, `requireAdmin`) are client-side only and are UX, not a security control. **There are no SQL migrations in the repo**, so the actual RLS policies cannot be verified from source — yet they are the only thing standing between any logged-in student and every other student's PII. That single unknown is the headline risk: if any one policy is missing or wrong, it is a full cross-tenant data leak.

The server-side pieces are mostly sound: `admin-create-student` correctly re-verifies the caller is an admin using the service role before acting. The main server weakness is the Calendly webhook, which **fails open** (accepts unsigned requests) when its signing secret isn't configured.

| Severity | Count |
|---|---|
| Critical | 1 (contingent — needs DB verification) |
| High | 2 |
| Low | 4 |

> Two findings (SEC-001, SEC-003) cannot be confirmed from the repo because RLS lives in the Supabase dashboard, not in version control. They are reported with that uncertainty stated, per rules of engagement. The fix for both starts with the same step: get the policies into the repo so they can be reviewed.

---

## SEC-001 — Entire data layer depends on unverifiable RLS; all reads are unscoped
**Severity:** Critical (contingent on live DB config) · **Exploitability:** any authenticated student account, internet-facing · **Blast radius:** potentially all students' PII (names, emails, tutor notes, full journals, meeting history)

**Evidence:**
- `src/pages/Portal.jsx:105-114` — fetches `meetings` and `notes` with **no `.eq('student_id', …)`**:
  ```js
  portal.from('meetings').select('id, title, recap, scheduled_at, ended_at, status, calendly_event_uri')
        .order('scheduled_at', …)            // no owner filter
  portal.from('notes').select('id, body, author_role, created_at')
        .order('created_at', …)              // no owner filter
  ```
- `src/pages/Journal.jsx:391-395` — `portal.from('journal_entries').select('*')` with no owner filter.
- `src/pages/Admin.jsx:121-137` and `src/pages/AdminStudent.jsx:119-124` — read **all** profiles / meetings / notes / journal_entries; admin status is enforced only by RLS (the `requireAdmin` guard in `src/components/ProtectedRoute.jsx:42` is client-side and trivially bypassed by calling Supabase directly with any logged-in token).
- `src/lib/supabaseClient.js:3-4`, `src/lib/portalClient.js:14-15`, `src/lib/drillClient.js:17-18` — anon keys are shipped in the client bundle (expected and fine **only if** RLS is correct; the two are coupled).
- **No migrations anywhere:** `supabase/` contains only `functions/`. No `migrations/`, no policy SQL in the repo (`Glob supabase/**/*.sql` → none). The policies are unreviewable.

**Why it ranks here:** This is the Moltbook-class failure mode. The blast radius is the whole database of student PII, and reaching it requires only a single missing/incorrect policy on any one of four tables. Because the query layer does zero filtering, RLS is not defense-in-depth here — it is the *only* defense.

**Proposed fix:** Export the live policies (`supabase db dump` or pull schema) into a committed migration so they can be reviewed and version-controlled. Then confirm each of `profiles`, `meetings`, `notes`, `journal_entries` has RLS **enabled with an explicit policy** (RLS on with no policy is as exposed as off), that student SELECT is constrained to `auth.uid()` ownership, and that admin-wide access is gated on a verified `role = 'admin'` check. As defense-in-depth, add explicit `.eq('student_id', user.id)` to the student-facing queries so a policy gap doesn't silently become a full leak.

---

## SEC-002 — Calendly webhook fails open when signing key is unset (unauthenticated credit/meeting manipulation)
**Severity:** High (Critical if `CALENDLY_SIGNING_KEY` is not set in prod) · **Exploitability:** unauthenticated; the function is deployed `--no-verify-jwt` and is internet-facing · **Blast radius:** any student's `meeting_credits` and `meetings` rows

**Evidence:** `supabase/functions/calendly-webhook/index.ts:30-31`
```ts
async function verifySignature(header, rawBody) {
  if (!SIGNING_KEY) return true // verification disabled (not recommended)
```
The function (`--no-verify-jwt`, per its deploy comment at line 14) writes to `meetings` and adjusts `profiles.meeting_credits` (lines 94-108, 128-131) using the **service role**. If `CALENDLY_SIGNING_KEY` is absent, `verifySignature` returns `true` for *any* request. An attacker who knows the function URL and a target student's email can POST forged `invitee.created` events with unique `calendly_event_uri` values to drain that student's credits to zero, and inject fabricated meeting rows that surface in the student's portal.

**Why it ranks here:** Unverified webhook that mutates state with the service role is a Critical pattern; it's gated only on an *optional* secret. Capped at High here because the damage is limited to credits/meeting rows (no PII read, no DB-wide write), and it's Critical-in-practice only if the secret was never configured.

**Proposed fix:** Make the signing key mandatory — return `401` (fail closed) when `SIGNING_KEY` is empty instead of `return true`. Confirm `CALENDLY_SIGNING_KEY` is set as a function secret in production.

---

## SEC-003 — Client supplies `student_id` and `author_role` on inserts (cross-account write / role spoof if RLS WITH CHECK is missing)
**Severity:** High (contingent on RLS insert policies) · **Exploitability:** any authenticated student · **Blast radius:** writing into another student's account; spoofing "from David" notes

**Evidence:**
- `src/pages/Portal.jsx:149` — student note insert sets both fields from the client: `insert({ student_id: user.id, author_id: user.id, author_role: 'student', body })`. Nothing server-side stops a crafted request from sending a *different* `student_id`, or `author_role: 'admin'` to forge a tutor note.
- `src/pages/Journal.jsx:186, 211` — `student_id` taken from client state and inserted/updated directly.
- `src/pages/AdminStudent.jsx:153, 178` — meeting/note inserts carry a client-provided `student_id`.

These are only safe if every table has an RLS **WITH CHECK** policy pinning `student_id` to `auth.uid()` (and ideally a CHECK/trigger constraining `author_role`). That cannot be confirmed from the repo (see SEC-001).

**Why it ranks here:** If the insert policies are absent or check only `USING` (read) and not `WITH CHECK` (write), any student can write rows into another student's portal/journal. Role spoofing alone (forging an admin note to oneself) is low impact; cross-account write is High.

**Proposed fix:** Verify/define `WITH CHECK (student_id = auth.uid())` on insert/update for `notes`, `journal_entries`, and `meetings`; constrain `author_role` to an allowed value per actor (e.g. a trigger or CHECK so students can't set `'admin'`). Don't rely on the client-sent `student_id`.

---

## SEC-004 — CORS wildcard on `admin-create-student`
**Severity:** Low · **Exploitability:** requires a valid admin token · **Blast radius:** none beyond what the admin can already do

**Evidence:** `supabase/functions/admin-create-student/index.ts:20` — `'Access-Control-Allow-Origin': '*'`. Auth is via a `Bearer` token (not cookies), so this isn't CSRF-exploitable, but it lets any origin invoke the function with a token it already holds. Low risk; worth tightening.

**Proposed fix:** Restrict the allowed origin to the production site (`https://www.lsat.academy`) rather than `*`.

---

## SEC-005 — Non-constant-time HMAC comparison in webhook signature check
**Severity:** Low · **Evidence:** `supabase/functions/calendly-webhook/index.ts:47` — `return expected === v1`. String `===` short-circuits and is not timing-safe; theoretically a signature-forgery oracle. Network jitter makes this impractical, but a constant-time compare is cheap. Also `header.split(',').map(kv => kv.split('='))` (line 33) is brittle parsing — fine for Calendly's current format, but worth hardening alongside SEC-002.
**Proposed fix:** Compare with a constant-time equality over the raw bytes.

---

## SEC-006 — Contact form has no rate limiting / bot protection
**Severity:** Low · **Evidence:** `src/components/ContactForm.jsx:16-21` — EmailJS service/template/public keys in the bundle (public by EmailJS design), with no captcha or throttle. Abusable for email spam through your EmailJS quota. **Proposed fix:** Add a captcha/honeypot and/or EmailJS allowed-origin + rate limits.

---

## SEC-007 — `.gitignore` does not list `.env` files
**Severity:** Low (informational) · **Evidence:** `.gitignore` has no `env` entry; `.env.example` is intentionally committed and `git ls-files` shows no real `.env` tracked today (good). But with no ignore rule, a future `.env` containing the service-role key or `CALENDLY_SIGNING_KEY` could be committed by accident. **Proposed fix:** Add `.env`, `.env.local`, `.env.*` (keeping `!.env.example`) to `.gitignore`.

---

## Checked and clean / not applicable
- **SQL injection:** none — all DB access is through the Supabase query builder (parameterized); no string-concatenated SQL.
- **XSS:** none — no `dangerouslySetInnerHTML`, no `eval`; all user content rendered as text by React.
- **Hardcoded high-value secrets / secrets in git history:** none found. Only publishable anon keys and EmailJS/HubSpot public keys are in source; no `service_role`, `whsec_`, `sk_*`, or similar in the tree or history (`git log -S service_role` → empty).
- **SSRF:** none — server-side fetches (Edge Functions) only call Supabase with fixed URLs; no user-supplied URL is fetched. The Drill Finder does anonymous reads only.
- **admin-create-student authorization:** correct — re-verifies the caller's `role = 'admin'` server-side via the service role before creating a user (`index.ts:43-52`). Good pattern.
- **Pre-flight (poisoned agent config):** clean — no `.cursorrules`/`CLAUDE.md`/`AGENTS.md`/MCP config present; no zero-width or bidirectional Unicode in any tracked text file.

---

## Next step (Phase 4 — human checkpoint)
Review the above and decide which findings are real / accepted, and the fix order. Recommended order:
1. **SEC-001** — verify/commit RLS policies (this also resolves the unknown in SEC-003). Highest blast radius.
2. **SEC-002** — make the webhook fail closed and confirm the signing key is set in prod. Quick, unauthenticated.
3. **SEC-003** — confirm WITH CHECK insert policies + `author_role` constraint.
4. **SEC-004 / SEC-005 / SEC-006 / SEC-007** — low-effort hardening.

Nothing will be edited until you approve a finding to fix (Phase 5, one at a time, diff-first).
