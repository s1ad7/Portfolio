"use client"
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    console.log('Contact form submitted', payload)
    setStatus('Thanks! Your message has been noted.')
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="section">
      <div className="mb-8 text-center">
        <h2 className="heading font-[var(--font-poppins)]">Contact</h2>
        <p className="subheading mx-auto">Let’s build something great together.</p>
      </div>

      <div className="w-full grid gap-8 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm text-neutral-300">Name</label>
              <input id="name" name="name" type="text" required className="mt-1 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-neutral-300">Email</label>
              <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="block text-sm text-neutral-300">Message</label>
            <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-md bg:white/5 bg-white/5 px-3 py-2 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="What would you like to discuss?" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button type="submit" className="btn-primary">Send</button>
            {status && <span className="text-sm text-green-400">{status}</span>}
          </div>
        </form>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm text-neutral-300">Find me online</div>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="https://www.linkedin.com/in/saad-ifli/" target="_blank" className="btn-ghost">LinkedIn</Link>
            <Link href="https://github.com/saadifli" target="_blank" className="btn-ghost">GitHub</Link>
            <Link href="mailto:contact@saadifli.dev" className="btn-ghost">Email</Link>
          </div>
        </div>
      </div>
    </section>
  )
}