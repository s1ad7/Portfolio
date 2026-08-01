'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, DURATION_UI, EASE_UI } from '@/lib/gsap'
import { useNavHidden } from '@/lib/useNavHidden'
import { useContent } from './ContentProvider'
import { LanguageSwitcher } from './ui/LanguageSwitcher'
import { Pill } from './ui/Pill'
import { Wordmark } from './ui/Wordmark'

export function Navbar() {
  const { content, locale } = useContent()
  const { nav } = content

  /* Section anchors exist on the homepage only. Everywhere else they have to
     carry the homepage path or they resolve to nothing at all. Kept relative on
     the homepage so the smooth-scroll handler still claims them. */
  const pathname = usePathname()
  const onHome = pathname === `/${locale}`
  const to = (hash: string) => (onHome ? hash : `/${locale}${hash}`)

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const headerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  /* Clicking a nav link scrolls the page down, which would immediately tuck the
     bar away: you press something and it vanishes under your cursor. Pin it
     briefly so the bar survives its own navigation. */
  const [pinned, setPinned] = useState(false)
  const pinTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pin = useCallback(() => {
    setPinned(true)
    if (pinTimer.current) clearTimeout(pinTimer.current)
    pinTimer.current = setTimeout(() => setPinned(false), 1400)
  }, [])
  useEffect(
    () => () => {
      if (pinTimer.current) clearTimeout(pinTimer.current)
    },
    []
  )

  // Never tuck the bar away while the mobile menu is open or just after a click.
  const hidden = useNavHidden(open || pinned)

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
    /* `nav` is a module-level dictionary reached through context, so its
       identity is stable and this re-subscribes only if the locale changes,
       which is a full document load anyway. */
  }, [nav])

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

  // Tuck the bar away on downward scroll, bring it back on upward.
  useGSAP(
    () => {
      gsap.to(headerRef.current, {
        yPercent: hidden ? -105 : 0,
        duration: DURATION_UI,
        ease: EASE_UI,
      })
    },
    { dependencies: [hidden] }
  )

  /* Overlay enter and exit.
   *
   * GSAP has no AnimatePresence, so the element stays mounted and is animated
   * both ways. `visibility` and `inert` are driven alongside opacity so the
   * closed overlay is genuinely inert rather than merely transparent, which
   * would still trap keyboard focus. */
  useGSAP(
    () => {
      const el = overlayRef.current
      if (!el) return
      const links = el.querySelectorAll('a')

      if (open) {
        gsap.set(el, { visibility: 'visible' })
        gsap.to(el, { opacity: 1, duration: 0.25, ease: EASE_UI })
        gsap.fromTo(
          links,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.05, delay: 0.05 }
        )
      } else {
        gsap.to(el, {
          opacity: 0,
          duration: 0.2,
          ease: EASE_UI,
          onComplete: () => gsap.set(el, { visibility: 'hidden' }),
        })
      }
    },
    { dependencies: [open] }
  )

  return (
    <>
      {/* Flush to the top of the viewport, inset to match the section cards, with
          only the bottom corners rounded. Tucks away on downward scroll so
          reading gets the whole viewport. */}
      <header ref={headerRef} className="safe-x fixed inset-x-0 top-0 z-50 px-3 md:px-6">
        <nav aria-label="Main" className="rounded-b-shell bg-glass shadow-ramp backdrop-blur-xl">
          {/* Wordmark left, then links and the CTA as one right-aligned group. */}
          <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-6 md:h-20 md:px-10">
            <div className="flex items-center gap-4">
              <Wordmark />
              <span className="hidden sm:block">
                <LanguageSwitcher current={locale} />
              </span>
            </div>

            <div className="flex items-center gap-8">
              <ul className="hidden items-center gap-8 md:flex">
                {nav.map((item) => {
                  const isActive = active === item.href.slice(1)
                  return (
                    <li key={item.href}>
                      <Link
                        href={to(item.href)}
                        onClick={pin}
                        aria-current={isActive ? 'true' : undefined}
                        /* Work Sans 16/400 at full ink, fading to 70% on hover.
                           The reference keeps all links at full ink and has no
                           active indicator, so scroll-spy is exposed only via
                           aria-current for assistive tech. */
                        /* -my-3 keeps the visual position while the hit area reaches 44px. */
                        className="-mx-2 -my-3 flex min-h-11 items-center px-2 py-3 font-ui text-base text-ink transition-colors duration-200 ease-signature hover:text-muted"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Wrapped rather than given `hidden` directly: Pill's base class
                  already sets `inline-flex`, and two display utilities on one
                  element resolve by stylesheet order, not class order. */}
              <span className="hidden md:block">
                <Pill href={to('#contact')} variant="dark">
                  {content.navCta}
                </Pill>
              </span>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? content.menu.close : content.menu.open}
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-white md:hidden"
              >
                <span
                  className={`block h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-200 ease-signature ${
                    open ? 'translate-y-[3.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-200 ease-signature ${
                    open ? '-translate-y-[3.5px] -rotate-45' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className="safe-x invisible fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 opacity-0 md:hidden"
        aria-hidden={!open}
        /* React 19 takes `inert` as a boolean. Passing the HTML-style empty
           string silently produced no attribute at all, so the closed overlay
           was relying on `visibility: hidden` alone to stay out of the tab
           order. */
        inert={!open}
      >
        <ul className="flex flex-col gap-2">
          {[...nav, { label: content.navCta, href: '#contact' }].map((item) => (
            <li key={item.href}>
              <Link href={to(item.href)} onClick={() => setOpen(false)} className="block py-3 text-4xl">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
