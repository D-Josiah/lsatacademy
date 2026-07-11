// admin-create-student — creates a new student auth user (admin-only).
//
// The browser can't create auth users (that needs the service-role key, which
// must never ship to the client). This Edge Function does it server-side: it
// verifies the CALLER is an admin using their JWT, then uses the service role
// to create the user. The on_auth_user_created trigger then inserts the profile
// row (role derived from email domain, plus the meeting_credits we pass in).
//
// Deploy:  supabase functions deploy admin-create-student
// Secrets: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically
//          to deployed functions; no extra config needed.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

// Only reflect CORS for known origins instead of '*'. Add preview/staging
// origins to ALLOWED_ORIGINS (comma-separated env var) as needed.
const ALLOWED_ORIGINS = new Set(
  (Deno.env.get('ALLOWED_ORIGINS') ??
    'https://www.lsat.academy,https://lsat.academy,http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
)

const corsFor = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && ALLOWED_ORIGINS.has(origin) ? origin : 'null',
  'Vary': 'Origin',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
})

Deno.serve(async (req) => {
  const cors = corsFor(req.headers.get('Origin'))
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })

  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  // 1. Verify the caller is a logged-in admin.
  const authHeader = req.headers.get('Authorization') ?? ''
  const token = authHeader.replace('Bearer ', '')
  if (!token) return json({ error: 'Not authenticated' }, 401)

  const callerClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: { user: caller }, error: callerErr } = await callerClient.auth.getUser(token)
  if (callerErr || !caller) return json({ error: 'Not authenticated' }, 401)

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
  const { data: callerProfile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', caller.id)
    .single()
  if (callerProfile?.role !== 'admin') return json({ error: 'Admins only' }, 403)

  // 2. Validate input.
  let payload: { email?: string; password?: string; full_name?: string; meeting_credits?: number }
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }
  const email = (payload.email ?? '').trim().toLowerCase()
  const password = payload.password ?? ''
  const full_name = (payload.full_name ?? '').trim()
  const meeting_credits = Number.isFinite(payload.meeting_credits) ? Number(payload.meeting_credits) : 0

  if (!email || !password) return json({ error: 'Email and password are required' }, 400)
  if (password.length < 8) return json({ error: 'Password must be at least 8 characters' }, 400)

  // 3. Create the user (email pre-confirmed so they can log in immediately).
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, meeting_credits },
  })
  if (createErr) return json({ error: createErr.message }, 400)

  // 4. Make sure the profile reflects the name + credits (the trigger may run
  //    before user_metadata is readable in some setups, so upsert to be safe).
  await admin
    .from('profiles')
    .update({ full_name, meeting_credits })
    .eq('id', created.user.id)

  return json({ user: { id: created.user.id, email: created.user.email } }, 200)
})
