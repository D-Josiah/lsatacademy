import { createClient } from '@supabase/supabase-js'

// LSAT Answers counter client (used only by src/pages/LSATAnswers.jsx).
//
// !! This project (iegyaziwbyzugxwbqrjt) NO LONGER EXISTS — its DNS doesn't
// resolve, so every call fails ("404 Not Found / openresty" while it was
// paused, DNS errors now). LSATAnswers catches the failure and falls back to
// reference #1, so the page works but the counter never counts. To restore it,
// recreate the `lsat_counter` table + `increment_counter` RPC in the active
// project (see portalClient.js) and point this URL/key there.
const supabaseUrl = 'https://iegyaziwbyzugxwbqrjt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZ3lheml3Ynl6dWd4d2Jxcmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MDk1MDUsImV4cCI6MjA3NjM4NTUwNX0.1cydhnGIng2Ue049pKpB3TyRoKBeHoajpsyUmS1UtYc'

// Session-less: the counter only does anonymous reads + one RPC. Without these
// options createClient spins up a full auth client (storage, URL detection,
// navigator.locks) that this page never uses.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'lsat-answers-anon',
    lock: (_name, _acquireTimeout, fn) => fn(),
  },
})
