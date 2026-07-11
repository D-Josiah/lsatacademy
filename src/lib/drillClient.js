import { createClient } from '@supabase/supabase-js'

// Drill Finder client. It currently points at the SAME Supabase project as the
// portal (see portalClient.js) but stays a separate, session-less instance so
// its anonymous reads can never interact with the portal's auth state.
//
// Credentials: set VITE_DRILL_SUPABASE_URL / VITE_DRILL_SUPABASE_ANON_KEY in
// Vercel env vars (preferred) to override the fallbacks below at build time —
// this also allows moving the drill bank to its own project later.
//
// See context/DRILL_FINDER_SETUP.md for the table schema + CSV import steps.

const PLACEHOLDER_URL = 'https://YOUR-NEW-PROJECT.supabase.co'
const PLACEHOLDER_KEY = 'YOUR_NEW_ANON_KEY'

// Drill Finder's dedicated project (separate from the main site DB).
// The publishable key is safe to expose in client code.
const FALLBACK_URL = 'https://dtlcpjzxuamkplhpylin.supabase.co'
const FALLBACK_KEY = 'sb_publishable_8iUvTj_0U41R66rHfK0R-Q_6ngLtuK1'

const drillUrl = import.meta.env.VITE_DRILL_SUPABASE_URL || FALLBACK_URL
const drillAnonKey = import.meta.env.VITE_DRILL_SUPABASE_ANON_KEY || FALLBACK_KEY

// True once real credentials are in place — the page uses this to show a
// friendly "coming soon" state instead of erroring before the DB is wired up.
export const drillConfigured =
  drillUrl !== PLACEHOLDER_URL && drillAnonKey !== PLACEHOLDER_KEY

export const DRILL_TABLE = 'drill_questions'
export const DRILL_REVIEWS = 'drill_reviews'

// Session-less: the Drill Finder only ever does anonymous reads. It shares the
// same Supabase project as the portal's authed client (src/lib/portalClient.js),
// so it must NOT touch auth at all — otherwise two GoTrueClients compete over the
// browser auth lock (navigator.locks) and can stall getSession()/sign-in,
// freezing the portal. We give it its own storage key and a no-op lock so it can
// never acquire or wait on the shared lock.
export const drillClient = createClient(drillUrl, drillAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'lsat-drill-anon',
    // Bypass navigator.locks entirely — anonymous reads need no coordination.
    lock: (_name, _acquireTimeout, fn) => fn(),
  },
})
