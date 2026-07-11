// Generates context/TODO.pdf from the HTML below using the Chromium that ships
// with @playwright/test. Run: node scripts/make-todo-pdf.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '..', 'context', 'TODO.pdf');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #102a36; margin: 0; padding: 44px 52px; font-size: 12.5px; line-height: 1.5; }
  h1 { font-size: 24px; margin: 0 0 2px; color: #023247; }
  .sub { color: #5b6770; margin: 0 0 22px; font-size: 12px; }
  h2 { font-size: 14px; margin: 22px 0 8px; color: #1a7d8c; border-bottom: 1.5px solid #d9e2e6; padding-bottom: 4px; }
  ul { margin: 6px 0 12px; padding-left: 18px; }
  li { margin: 4px 0; }
  code { background: #f1f4f5; padding: 1px 5px; border-radius: 4px; font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11px; }
  .box { background: #f1f8f9; border: 1px solid #cfe6ea; border-radius: 8px; padding: 10px 14px; margin: 8px 0; }
  .muted { color: #6b7680; }
  .check { color: #1f7a44; font-weight: 700; }
</style></head><body>

<h1>LSAT Academy Portal — Setup TODO</h1>
<p class="sub">Pending steps to take the portal live. (This file lives in /context, which is gitignored and never deployed.)</p>

<h2>1. Apply database migrations</h2>
<p>Run <code>supabase db push</code> (or paste each into the Supabase SQL editor, in order). All are idempotent.</p>
<ul>
  <li><code>0003_add_profiles_meetings_total</code> — package total (enables the 8/10 display)</li>
  <li><code>0004_student_internal_notes</code> — internal notes table</li>
  <li><code>0005_journal_tutor_note</code> — tutor reply on journal entries</li>
  <li><code>0006_journal_source_label</code> — journal source label</li>
  <li><code>0007_add_profiles_status</code> — Active / Inactive student tag</li>
  <li><code>0008_add_journal_discuss_with_tutor</code> — "Discuss with tutor" flag</li>
  <li><code>0009_internal_notes_dated_log</code> — internal notes as a dated log</li>
  <li><code>0010_add_profiles_miro_url</code> — per-student Miro board URL</li>
  <li><code>0011_meetings_credit_consumed</code> — correct credit refund on cancel</li>
</ul>

<h2>2. Seed / data</h2>
<ul>
  <li>Set Sydney's package: <code>meetings_total = 10</code>, <code>meeting_credits = 8</code> (first consult free).</li>
  <li>Load Sydney's real meetings (your SQL: each row needs <code>title</code> + <code>calendly_event_uri</code> for the View recap button). Earliest meeting auto-labels "Free consult".</li>
  <li>Add the welcome note from David (admin UI: log in as David → Sydney → Notes → Add note, or via SQL).</li>
</ul>

<h2>3. Calendly webhook (auto credit consume / refund)</h2>
<p>Code is ready in <code>supabase/functions/calendly-webhook</code>. To turn it on:</p>
<ul>
  <li>Get a Calendly <b>Personal Access Token</b> (Integrations &amp; apps → API &amp; webhooks).</li>
  <li>Get org + user URIs: <code>curl https://api.calendly.com/users/me -H "Authorization: Bearer PAT"</code></li>
  <li>Deploy: <code>supabase functions deploy calendly-webhook --no-verify-jwt</code></li>
  <li>Endpoint: <code>https://dtlcpjzxuamkplhpylin.supabase.co/functions/v1/calendly-webhook</code></li>
  <li>Set secret: <code>supabase secrets set CALENDLY_SIGNING_KEY=whsec_...</code></li>
  <li>Create the webhook subscription for <code>invitee.created</code> + <code>invitee.canceled</code> with the <b>same</b> signing_key.</li>
</ul>
<div class="box"><b>Gotchas:</b> the subscription's <code>signing_key</code> MUST equal the <code>CALENDLY_SIGNING_KEY</code> secret. And the webhook matches a student by <code>profiles.email</code> or <code>profiles.calendly_email</code> — if a student books with a different email, set their <code>calendly_email</code> or no credit moves.</div>

<h2>4. Nice-to-haves (optional)</h2>
<ul>
  <li>Add a "Calendly email" field on the admin student page (closes the email-matching gap).</li>
  <li>Surface "flagged to discuss" journal entries on the admin Journal tab.</li>
  <li>Re-enable the skipped <code>auto-classifies</code> journal test once the entry modal settles.</li>
  <li>Wire a real test student account into the e2e suite (<code>E2E_STUDENT_EMAIL</code> / <code>E2E_STUDENT_PASSWORD</code>).</li>
</ul>

<h2>Already done <span class="check">&#10003;</span></h2>
<ul class="muted">
  <li>Auth loading / lock fixes, resilient profile loads, watchdog.</li>
  <li>Isolated drill Supabase client (no more lock contention).</li>
  <li>Portal width bug fixed (#root width), tabs, timeline, 8/10, badges.</li>
  <li>Active/Inactive toggle, internal notes log, Miro URL, header/footer stripped on portal.</li>
  <li>Calendly webhook hardened: replay protection + correct consume/refund.</li>
  <li>Test suite: 71 passing (1 skipped), build green.</li>
</ul>

</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.pdf({ path: out, format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } });
await browser.close();
console.log('Wrote', out);
