# Test Plan — LSAT Academy

Stack: React 18 + Vite 6, plain JS/JSX, React Router 7, Supabase (auth + Postgres).
No tests exist today. This plan adds **Vitest** (unit + component/integration via React Testing Library + jsdom) and **Playwright** (e2e), co-located, wired to GitHub Actions.

Guiding rule: **lots of cheap unit tests on pure logic, a handful of component tests on the critical UI, 2–3 e2e on the flow that would be humiliating if it broke.** Marketing/content pages (`/about`, `/patterns`, `/rc-tips`, etc.) get **no tests** — no logic, not worth it.

Priorities you confirmed: auth+portal AND drill/journal both matter; nothing off-limits.

---

## Layer 1 — Unit tests (the bulk of the value)

### `src/lib/journal.test.js` — pure analytics, zero mocking
This file is the highest ROI in the whole repo: every function is pure (data in, data out). One test file, many cases.

- **`summarize(entries, today)`** — pass a fixed `today` (never the real clock).
  - empty array → `total:0, today:0, thisWeek:0, avgDifficulty:null, accuracy:null, streakDays:0`
  - `today`/`thisWeek` counts respect the 7-day window (entry exactly 6 days ago = in week; 7 days ago = out)
  - `accuracy` counts `correct` + `correct_guessed` as right, `incorrect` as wrong; rounds to whole %
  - `avgDifficulty` ignores entries with no `difficulty`; rounds to 1 decimal
  - uses `logged_on` when present, else `created_at.slice(0,10)`
- **`streak(entries, today)`**
  - empty → 0
  - consecutive days ending today → correct count
  - **anchors to most recent day when nothing logged today** (entries from yesterday+before still streak)
  - stops at the first gap
- **`weeklyVolume(entries, weeks, today)`** — returns `weeks` buckets oldest→newest; entries land in the right bucket by date; out-of-range entries dropped
- **`byDimension(entries, key)`** — frequency + `missRate`; sorted by `missed` desc then `total` desc; skips entries missing the key; `missRate` rounds
- **`topMistake` / `errorTagCounts`** — tally across `error_tags` arrays; handle entries with no tags; `topMistake` returns `null` when no tags; sorted by count desc
- **`calibration(entries)`** — `confidentWrong` (high confidence + incorrect), `shakyRight` (low confidence + not incorrect), and their rates; rates `null` when denominator is 0
- **`hardestUnsolved(entries)`** — only `needs_review && incorrect`; picks highest difficulty, tie-broken by most recent day; `null` when none qualify
- **`recommendation(entries)`** — `null` when nothing missed; otherwise weakest type/structure + a `drillLink`
- **`buildDrillLink({questionType, difficulty})`** — `/drill-finder` bare; `?type=...`; `?type=...&difficulty=...`; no difficulty when falsy
- **`questionTypeLabel` / `prettyStructure`** — known value → friendly label; unknown value → passthrough/`—`; `prettyStructure('Scope-Concept-Shift')` → `Scope Concept Shift`

> **Bug-flag rule applies here:** if any function's *current* output looks wrong (e.g. an off-by-one in the week window, a streak edge case), I write the test for the **correct** behavior and flag it in the summary rather than asserting the buggy value.

### `src/lib/drillClient.test.js` — config flag only
- `drillConfigured` is `true` with the real fallback creds, `false` with placeholders (small, but it gates the whole page's "coming soon" state)

---

## Layer 2 — Component / integration tests (RTL + mocked Supabase)

Supabase is mocked at the module boundary (`vi.mock('../lib/portalClient')` / `drillClient`). We test **behavior**, not Supabase internals. A small `renderWithProviders` helper wraps components in `MemoryRouter` + a fake `AuthProvider` value.

### `src/components/ProtectedRoute.test.jsx` — the security guard (highest-risk UI)
- `loading` → renders the "Loading…" placeholder, not the child
- no `session` → redirects to `/login` (and carries `from` location state)
- session but `profile` not yet loaded (with `requireAdmin`/`studentOnly`) → renders nothing (waits)
- `requireAdmin` + non-admin → redirect to `/portal`
- `studentOnly` + admin → redirect to `/admin`
- valid student + `studentOnly` → renders the child
- valid admin + `requireAdmin` → renders the child

### `src/pages/Login.test.jsx` — sign-in form
- already-signed-in student → redirects to `/portal`; admin → `/admin`; honors `location.state.from`
- submit calls `signIn(email, password)` with **trimmed** email
- invalid creds → friendly "email and password don't match" message (the special-cased branch)
- other error → shows the raw `err.message`
- "Forgot password?" with empty email → inline "enter your email first" error, does **not** call `resetPassword`
- "Forgot password?" with email → calls `resetPassword`, shows the "check your inbox" notice
- button shows "Signing in…" and is disabled while busy

### `src/lib/AuthContext.test.jsx` — the auth brain
- on mount, reads initial session via `getSession`; if a user exists, fetches the profile row
- `onAuthStateChange` login event → sets session + profile; logout event → clears both
- profile fetch error → `profile` stays `null` (logs, doesn't throw)
- `signIn` trims email; `resetPassword` trims + passes the `/update-password` redirect
- `signOut` clears local state even when `portal.auth.signOut` throws (the wrapped-try case)
- `isAdmin` / `role` derive correctly from the profile

### `src/pages/DrillFinder.test.jsx` — anonymous search (scope: behavior, lightly)
- reads initial filters from URL query params (`?type=...` pre-selects, ties back to `buildDrillLink`)
- renders the "coming soon" state when `drillConfigured` is false
- applies a filter → issues the expected `drillClient.from('drill_questions')` query and renders returned rows
- pagination advances/limits correctly
- *(If DrillFinder turns out too tangled to test cleanly, I cut to just the URL-param + coming-soon cases and note it.)*

> Portal / Admin / Journal **page** components (`Portal.jsx`, `Admin.jsx`, `AdminStudent.jsx`, `Journal.jsx`) are heavier and lean on edge functions + many queries. **Default plan: do NOT write full component tests for these** — their valuable logic already lives in `journal.js` (unit-tested above). I'll add at most one smoke test per page (renders without crashing given mocked data) **only if cheap**. Tell me if you want deeper coverage here instead — that's the main scope dial.

---

## Layer 3 — End-to-end (Playwright, `/e2e/*.spec.ts`)

Real browser, real-ish app. Kept tiny because e2e is slow/flaky. These need a **test Supabase user** + env creds in CI — flagged as a setup dependency below.

- `e2e/auth.spec.ts`
  - **login → portal**: go to `/login`, sign in with a seeded student, assert landing on `/portal` and a portal element is visible *(the "humiliating if broken" flow)*
  - **guard redirect**: hit `/portal` while logged out → bounced to `/login`
- `e2e/drill-finder.spec.ts`
  - load `/drill-finder` (anonymous, no login), apply a filter, assert results render — this is the one public interactive feature

Resilience: timestamped/unique data per run, no hardcoded values that collide on re-run.

**Open question for you:** do we have (or can we make) a **dedicated test student account** + a Supabase URL/anon key safe to use in CI? If not, I'll write the e2e specs but mark them `test.skip` with a note, so unit + component tests still run green in CI and the e2e turns on once creds exist.

---

## Setup & CI (added in Move 3)

- `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@playwright/test` as devDependencies
- `vitest.config.js` (jsdom env, setup file for jest-dom) + `playwright.config.ts`
- `package.json` scripts: `test` (vitest run), `test:watch`, `test:e2e` (playwright), `test:all`
- `.github/workflows/test.yml` — runs unit+component on every push/PR; runs e2e (with `playwright install --with-deps`) gated on whether test creds are present
- A test env file pattern (`.env.test` / CI secrets) so Supabase creds aren't hardcoded

---

## What I'm deliberately NOT testing (and why)
- All marketing/content pages — static JSX, no logic
- Styling / exact pixel layout
- Third-party internals (Supabase, Calendly, EmailJS, HubSpot) — mocked, not re-tested
- Supabase **edge functions** (`admin-create-student`, `calendly-webhook`) — they're Deno/TS, run in a different runtime, and need service-role secrets. **Out of scope for this pass** unless you want them; testing them properly means a separate Deno test setup. Flagging, not silently dropping.

---

### Scope dial — the one decision for you
This plan is intentionally weighted to **unit tests (cheap, durable) + the auth guard + login**, with page-component tests kept minimal. If you'd rather I go deep on `Portal`/`Journal`/`Admin` page behavior, say so and I'll move budget there. Otherwise, edit/trim this file and tell me to implement.
