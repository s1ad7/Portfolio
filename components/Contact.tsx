'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ease } from '@/lib/motion'
import { contactSection, site } from '@/lib/content'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const inputClasses =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors duration-200 ease-signature focus:border-accent focus-visible:outline-none'

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

       Until then the mailto link below is the path that genuinely works.
    --------------------------------------------------------------------- */
    await new Promise((resolve) => setTimeout(resolve, 600))

    setBusy(false)
    setSent(true)
    form.reset()
  }

  return (
    <Section
      id="contact"
      eyebrow={contactSection.eyebrow}
      heading={contactSection.heading}
      intro={contactSection.intro}
    >
      <Reveal className="mx-auto max-w-xl">
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
            role="status"
            className="rounded-panel border border-line bg-panel p-8 text-center"
          >
            <p className="text-lg">{contactSection.success}</p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-4 label-caps !text-accent"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label={contactSection.fields.name}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="email"
                type="email"
                label={contactSection.fields.email}
                error={errors.email}
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="label-caps">
                {contactSection.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClasses} resize-y`}
                placeholder="What are you working on?"
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-accent">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-ramp transition-colors duration-200 ease-signature hover:bg-ink/85 disabled:opacity-60"
              >
                {busy ? 'Sending…' : contactSection.submit}
              </button>

              <p className="text-sm text-faint">
                or{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline decoration-line underline-offset-4 transition-colors duration-200 ease-signature hover:text-accent"
                >
                  email me directly
                </a>
              </p>
            </div>
          </form>
        )}
      </Reveal>
    </Section>
  )
}

function Field({
  id,
  label,
  error,
  type = 'text',
  autoComplete,
}: {
  id: 'name' | 'email'
  label: string
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-caps">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
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
