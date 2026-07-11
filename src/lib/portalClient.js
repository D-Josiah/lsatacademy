import { createClient } from '@supabase/supabase-js'

// Authed client for the student portal + admin panel. It talks to the SAME
// Supabase project as the Drill Finder (see drillClient.js), but this is the
// instance that owns the user SESSION — login, logout, password reset, and all
// RLS-protected reads/writes (profiles / meetings / notes) go through here.
//
// NOTE: this is intentionally separate from src/lib/supabaseClient.js, which
// points at a *different* project (the LSAT Answers counter) and must not move.
//
// The publishable (anon) key is safe to ship in client code; Row Level Security
// is what actually protects the data. Prefer setting these as Vercel env vars.

const FALLBACK_URL = 'https://dtlcpjzxuamkplhpylin.supabase.co'
const FALLBACK_KEY = 'sb_publishable_8iUvTj_0U41R66rHfK0R-Q_6ngLtuK1'

const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY

export const portal = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Distinct storage key so this auth instance never collides with the
    // session-less drillClient on the same project.
    storageKey: 'lsat-portal-auth',
    // Disable the cross-tab navigator.locks coordination. By default supabase-js
    // serializes every auth call (getSession / signIn / token refresh) behind a
    // browser lock. In dev, hot-reloads leave that lock held by stale clients, so
    // sign-in and getSession hang forever. This app is used in a single tab, so
    // the lock buys little — running auth calls directly removes the whole
    // deadlock class. (Tradeoff: two open tabs could race a token refresh; for a
    // single-user tutoring portal that's an acceptable, rare edge case.)
    lock: (_name, _acquireTimeout, fn) => fn(),
  },
})

// The Calendly "Book a session" link students use to schedule a session from
// their package. Exported here so the portal can prefill the student's name +
// email when sending them to Calendly.
export const BOOK_SESSION_URL =
  'https://calendly.com/dave-mcmaster/lsat-package-session'
