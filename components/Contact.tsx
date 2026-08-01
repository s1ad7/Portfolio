'use client'

import { useState } from 'react'
import { contactSection, site } from '@/lib/content'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

/* Reference input treatment: white field, hairline border, small radius. */
const inputClasses =
  'w-full rounded-[8px] border border-line/60 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors duration-200 ease-signature focus:border-accent focus-visible:outline-none'

/**
 * Get in touch, rebuilt to the reference's measured layout: a grey card
 * (radius 24, shadow ramp) inside the white section, pitch on the left with a
 * dot-grid flourish and social chips, and the form on the right as a lighter
 * glass panel (radius 16) with a full-width black pill Submit.
 */
export function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    /* Captured up front: React nulls out currentTarget once the handler yields,
       so reading it after the await below would throw. */
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const next: Errors = {}
    if (!name) next.name = 'Please enter your name.'
    if (!email) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email does not look right.'
    if (!message) next.message = 'Please enter a message.'
    else if (message.length < 10) next.message = 'A little more detail would help.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setBusy(true)

    /* ---------------------------------------------------------------------
       TODO: no endpoint is wired up yet, so nothing is actually delivered.
       Replace this block with a real submission, for example:

         const res = await fetch('/api/contact', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ name, email, message }),
         })
         if (!res.ok) throw new Error('Send failed')

       Until then the email chip on the left is the path that genuinely works.
    --------------------------------------------------------------------- */
    await new Promise((resolve) => setTimeout(resolve, 600))

    setBusy(false)
    setSent(true)
    form.reset()
  }

  return (
    <section id="contact" className="shell scroll-mt-28 bg-white py-10">
      <Reveal className="mx-auto w-full max-w-[1000px] px-4 lg:px-0">
        <div className="grid overflow-hidden rounded-[24px] bg-panel shadow-ramp lg:grid-cols-[1fr_488px]">
          {/* The pitch. */}
          <div className="relative flex flex-col p-6 lg:p-10">
            <div className="flex flex-col gap-3">
              <Eyebrow>{contactSection.eyebrow}</Eyebrow>
              {/* w900 on the reference; 800 is the heaviest the family ships. */}
              <h2 className="text-4xl font-extrabold">{contactSection.heading}</h2>
              <p className="max-w-md text-base leading-[1.8] text-body">{contactSection.intro}</p>
            </div>

            {/* The reference's dotted flourish between the copy and the chips. */}
            <div
              aria-hidden="true"
              className="dot-grid my-8 hidden min-h-24 flex-1 opacity-80 [mask-image:radial-gradient(ellipse_70%_90%_at_60%_50%,#000_30%,transparent_85%)] lg:block"
            />

            <ul className="mt-8 flex gap-2.5 lg:mt-0">
              {[
                { label: 'GitHub', href: site.links.github, icon: 'github' as const },
                { label: 'LinkedIn', href: site.links.linkedin, icon: 'linkedin' as const },
                { label: 'Email', href: `mailto:${site.email}`, icon: 'mail' as const },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.icon === 'mail' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-ink shadow-ramp transition-colors duration-200 ease-signature hover:text-accent"
                  >
                    <SocialIcon name={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* The form: a lighter glass panel sitting on the grey card. */}
          <div className="p-4 lg:p-6">
            <div className="h-full rounded-[16px] bg-white/60 p-6 backdrop-blur-sm">
              {sent ? (
                <div role="status" className="flex h-full flex-col items-start justify-center gap-4">
                  <p className="text-lg">{contactSection.success}</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="label-caps !text-accent"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex h-full flex-col gap-4">
                  <Field
                    id="name"
                    label={contactSection.fields.name}
                    placeholder="Sara Amrani"
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    id="email"
                    type="email"
                    label={contactSection.fields.email}
                    placeholder="sara@company.com"
                    error={errors.email}
                    autoComplete="email"
                  />

                  <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="message" className="label-field">
                      {contactSection.fields.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`${inputClasses} min-h-32 flex-1 resize-none`}
                      placeholder="Your message goes here..."
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-accent">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-full bg-ink py-2.5 font-display text-sm font-semibold text-white transition-colors duration-200 ease-signature hover:bg-ink-cta-hover disabled:opacity-60"
                  >
                    {busy ? 'Sending…' : contactSection.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Field({
  id,
  label,
  placeholder,
  error,
  type = 'text',
  autoComplete,
}: {
  id: 'name' | 'email'
  label: string
  placeholder: string
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label-field">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  )
}

function SocialIcon({ name }: { name: 'github' | 'linkedin' | 'mail' }) {
  if (name === 'github') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    )
  }
  if (name === 'linkedin') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.52V23H.24V8.25ZM8.34 8.25h4.33v2.01h.06c.6-1.14 2.08-2.34 4.28-2.34 4.57 0 5.42 3.01 5.42 6.92V23h-4.52v-7.16c0-1.71-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V23H8.34V8.25Z" />
      </svg>
    )
  }
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  )
}
