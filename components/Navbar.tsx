'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ease } from '@/lib/motion'
import { nav, site } from '@/lib/content'
import { Pill } from './ui/Pill'

/** Two-line wordmark, tight leading. Used by the nav and the footer. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link
      href="#top"
      className={`font-display text-[1.375rem] leading-[0.92] font-semibold tracking-[-0.03em] md:text-[1.5rem] ${className}`}
      aria-label={`${site.name}, back to top`}
    >
      {/* Two-tone, as on the reference: given name in grey, surname in full ink. */}
      <span className="block text-wordmark">{site.firstName}</span>
      <span className="block text-ink">{site.lastName}</span>
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  /* Scroll-spy: highlight whichever section currently owns the viewport. The
     -45%/-50% margins collapse the observed area to a band near the middle of
     the screen, so exactly one section is ever active. */
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* Lock body scroll while the mobile overlay is open. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* Escape closes the overlay. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Flush to the top of the viewport, inset to match the section cards, with
          only the bottom corners rounded. This is the reference's geometry:
          1392x80 at x=24, radius 0 0 40px 40px. */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-6">
        <nav
          aria-label="Main"
          className="flex h-16 w-full items-center justify-between gap-6 rounded-b-shell bg-glass px-5 shadow-ramp backdrop-blur-xl md:h-20 md:px-10"
        >
          <Wordmark />

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    /* The reference has no active indicator at all, so scroll-spy
                       is expressed purely as ink weight. A coloured underline
                       read as noise against how restrained the rest of the
                       chrome is. */
                    className={`text-base transition-colors duration-200 ease-signature hover:text-ink ${
                      isActive ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* Wrapped rather than given `hidden` directly: Pill's base class
                already sets `inline-flex`, and two display utilities on one
                element resolve by stylesheet order, not class order. */}
            <span className="hidden md:block">
              <Pill href="#contact" variant="dark">
                Contact
              </Pill>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-white md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease }}
                className="block h-[1.5px] w-4 rounded-full bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease }}
                className="block h-[1.5px] w-4 rounded-full bg-ink"
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {[...nav, { label: 'Contact', href: '#contact' }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
