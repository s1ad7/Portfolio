import { NextResponse } from 'next/server'
import { site } from '@/lib/content'

/**
 * Contact form endpoint.
 *
 * Provider-agnostic on purpose: the send is one function at the bottom of this
 * file, called through the REST API rather than an SDK, so switching from
 * Resend to anything else is a single edit and costs no dependency.
 *
 * When no provider is configured the route answers 503 with
 * `{ configured: false }`. That is not a failure case to hide: the client reads
 * it and falls back to opening a prefilled email, so a message still reaches
 * Saad on a fresh deploy with no environment variables set at all.
 */

export const runtime = 'nodejs'

type Payload = { name?: unknown; email?: unknown; message?: unknown; company?: unknown }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Rate limit: 5 per IP per 10 minutes. In-process, so it resets on redeploy and
   is per-instance rather than global. That is the right trade here: it stops the
   casual flood without adding a datastore, and the provider enforces the real
   ceiling. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  /* Keep the map from growing without bound on a long-lived instance. */
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  /* Honeypot. A real person never sees this field, so anything in it is a bot.
     Answer 200 so the bot believes it succeeded and does not retry. */
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  /* Validated again here, never trusting the client: the browser check is a
     convenience, this one is the actual gate. */
  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please enter your name.'
  else if (name.length > 100) errors.name = 'That name is too long.'
  if (!email) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'That email does not look right.'
  if (!message) errors.message = 'Please enter a message.'
  else if (message.length < 10) errors.message = 'A little more detail would help.'
  else if (message.length > 5000) errors.message = 'That message is too long.'

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages just now. Please try again shortly.' },
      { status: 429 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    /* Deliberately explicit, so the client can fall back rather than telling
       the visitor their message was sent when it was not. */
    return NextResponse.json({ configured: false }, { status: 503 })
  }

  try {
    await send({ apiKey, name, email, message })
  } catch (error) {
    console.error('[contact] send failed:', error)
    return NextResponse.json({ error: 'Could not send just now.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

/**
 * The only provider-specific code.
 *
 * `from` uses Resend's shared onboarding sender, which works without owning a
 * verified domain. Once saadifli.com is registered and verified, change it to
 * something like 'Portfolio <contact@saadifli.com>'.
 *
 * `reply_to` is the visitor's address, so replying from Gmail goes straight
 * back to them rather than to the sending service.
 */
async function send({
  apiKey,
  name,
  email,
  message,
}: {
  apiKey: string
  name: string
  email: string
  message: string
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
      to: [site.email],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        '',
        message,
        '',
        '--',
        `Sent from the contact form at ${site.url}`,
      ].join('\n'),
    }),
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`)
  }
}
