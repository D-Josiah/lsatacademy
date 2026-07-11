// calendly-webhook — keeps the portal in sync with David's Calendly.
//
// Subscribe this function's URL to the `invitee.created` and `invitee.canceled`
// events in Calendly (Webhooks API). On each event we:
//   - invitee.created  -> upsert a `meetings` row + decrement the student's
//                         meeting_credits (never below 0)
//   - invitee.canceled -> mark the meeting canceled + give the credit back
//
// Matching: we find the student by the invitee email (profiles.email first,
// then profiles.calendly_email). Unknown emails are stored with student_id null
// is NOT allowed (FK), so we skip + log them; David can still see the booking
// in Calendly itself.
//
// Deploy:  supabase functions deploy calendly-webhook --no-verify-jwt
//   (--no-verify-jwt because Calendly calls it without a Supabase JWT; we
//    authenticate the request with the Calendly signing key instead.)
// Secret:  supabase secrets set CALENDLY_SIGNING_KEY=whsec_xxx
//          (optional but strongly recommended — set it in the Calendly webhook).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const SIGNING_KEY = Deno.env.get('CALENDLY_SIGNING_KEY') ?? ''

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// Verify Calendly's HMAC-SHA256 signature header:
//   Calendly-Webhook-Signature: t=<ts>,v1=<hex hmac of `${t}.${rawBody}`>
// Constant-time string compare to avoid leaking a byte-by-byte match via timing.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

async function verifySignature(header: string | null, rawBody: string): Promise<boolean> {
  // Fail CLOSED: with no signing key we cannot authenticate the request, so we
  // reject it rather than trusting an unsigned payload (SEC-002). This means the
  // webhook will reject everything until CALENDLY_SIGNING_KEY is configured.
  if (!SIGNING_KEY) {
    console.error('CALENDLY_SIGNING_KEY is not set — rejecting unsigned webhook.')
    return false
  }
  if (!header) return false
  // Parse only the first '=' per field so a '=' inside a value can't break it.
  const parts: Record<string, string> = {}
  for (const kv of header.split(',')) {
    const i = kv.indexOf('=')
    if (i > 0) parts[kv.slice(0, i).trim()] = kv.slice(i + 1).trim()
  }
  const t = parts['t']
  const v1 = parts['v1']
  if (!t || !v1) return false

  // Replay protection (Calendly recommends a tolerance window): reject signatures
  // whose timestamp is too old. 5 minutes covers clock skew + delivery latency.
  // `t` is inside the signed payload, so an attacker can't forge it — this stops
  // a captured-and-replayed valid request from being accepted later.
  const tsMs = Number(t) * 1000
  if (!Number.isFinite(tsMs) || tsMs < Date.now() - 5 * 60 * 1000) {
    console.error('Webhook timestamp outside tolerance — rejecting (possible replay).')
    return false
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SIGNING_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${rawBody}`))
  const expected = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')
  return timingSafeEqual(expected, v1)
}

async function findStudentId(email: string): Promise<string | null> {
  const e = email.toLowerCase()
  const byEmail = await admin.from('profiles').select('id').eq('email', e).maybeSingle()
  if (byEmail.data) return byEmail.data.id
  const byCalendly = await admin.from('profiles').select('id').eq('calendly_email', e).maybeSingle()
  return byCalendly.data?.id ?? null
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const raw = await req.text()
  const ok = await verifySignature(req.headers.get('Calendly-Webhook-Signature'), raw)
  if (!ok) return new Response('Invalid signature', { status: 401 })

  let body: any
  try {
    body = JSON.parse(raw)
  } catch {
    return new Response('Bad JSON', { status: 400 })
  }

  const event: string = body.event
  const p = body.payload ?? {}
  const inviteeEmail: string = p.email ?? ''
  const ev = p.scheduled_event ?? {}
  const eventUri: string = ev.uri ?? p.uri ?? ''

  if (!inviteeEmail || !eventUri) return new Response('ok (ignored: missing fields)', { status: 200 })

  const studentId = await findStudentId(inviteeEmail)
  if (!studentId) {
    console.log(`No portal student matches ${inviteeEmail}; skipping.`)
    return new Response('ok (no matching student)', { status: 200 })
  }

  if (event === 'invitee.created') {
    // Idempotent upsert keyed by the Calendly event URI.
    const { data: existing } = await admin
      .from('meetings')
      .select('id, credit_consumed')
      .eq('calendly_event_uri', eventUri)
      .maybeSingle()

    // Spend a credit ONLY for a brand-new booking AND only if the student has a
    // package with credits left. We record whether we consumed one so a later
    // cancellation refunds exactly what was spent (and nothing if 0 were left).
    let consume = false
    if (!existing) {
      const { data: prof } = await admin
        .from('profiles')
        .select('meeting_credits')
        .eq('id', studentId)
        .single()
      consume = (prof?.meeting_credits ?? 0) > 0
    }

    await admin.from('meetings').upsert(
      {
        student_id: studentId,
        title: ev.name ?? 'LSAT session',
        scheduled_at: ev.start_time ?? null,
        ended_at: ev.end_time ?? null,
        status: 'scheduled',
        calendly_event_uri: eventUri,
        calendly_invitee_email: inviteeEmail.toLowerCase(),
        // Preserve the flag on re-delivery; set it for a new booking.
        credit_consumed: existing ? existing.credit_consumed : consume,
      },
      { onConflict: 'calendly_event_uri' },
    )

    if (consume) await adjustCredits(studentId, -1)
    return new Response('ok (created)', { status: 200 })
  }

  if (event === 'invitee.canceled') {
    const { data: row } = await admin
      .from('meetings')
      .select('id, status, credit_consumed')
      .eq('calendly_event_uri', eventUri)
      .maybeSingle()
    if (row && row.status !== 'canceled') {
      await admin.from('meetings').update({ status: 'canceled', credit_consumed: false }).eq('id', row.id)
      // Refund ONLY if this booking actually spent a credit.
      if (row.credit_consumed) await adjustCredits(studentId, +1)
    }
    return new Response('ok (canceled)', { status: 200 })
  }

  return new Response('ok (unhandled event)', { status: 200 })
})

async function adjustCredits(studentId: string, delta: number) {
  const { data } = await admin.from('profiles').select('meeting_credits').eq('id', studentId).single()
  const next = Math.max(0, (data?.meeting_credits ?? 0) + delta)
  await admin.from('profiles').update({ meeting_credits: next }).eq('id', studentId)
}
