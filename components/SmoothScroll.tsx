'use client'

import { useEffect } from 'react'

/**
 * Inertial scrolling, which is a large part of why the reference feels the way
 * it does. Disabled outright when the visitor asks for reduced motion, since
 * hijacking the scroll is exactly the kind of thing that setting is for.
 *
 * Lenis is imported dynamically, after the browser reports itself idle, for two
 * reasons: it is pure enhancement (the page scrolls fine without it), and on a
 * throttled phone every kilobyte of startup JavaScript delays first paint. It
 * is never fetched at all by visitors who asked for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    type LenisInstance = {
      raf: (t: number) => void
      destroy: () => void
      scrollTo: (target: HTMLElement) => void
    }
    let lenis: LenisInstance | undefined
    let frame = 0
    let cancelled = false

    const start = () => {
      void import('lenis').then(({ default: Lenis }) => {
        if (cancelled) return
        lenis = new Lenis({
          duration: 1.1,
          // Matches the reference's easing: quick to start, soft to settle.
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        const raf = (time: number) => {
          lenis?.raf(time)
          frame = requestAnimationFrame(raf)
        }
        frame = requestAnimationFrame(raf)
      })
    }

    /**
     * In-page anchors, animated rather than jumped.
     *
     * Lenis takes over the scroll but leaves anchor clicks alone, and these
     * links are next/link, which handles the click itself: it calls
     * preventDefault and performs its own instant scroll. So this runs in the
     * CAPTURE phase, which fires before React's root listener, and claims the
     * event first. Propagation is deliberately not stopped, so the navbar still
     * pins itself and the mobile overlay still closes.
     *
     * Handled here for every `#` link at once (nav, hero CTA, About CTA,
     * wordmark) instead of per component.
     *
     * No manual offset: Lenis already honours the target's `scroll-margin-top`,
     * as does native scrollIntoView, so passing one landed everything at 224px
     * instead of 112. The navbar clearance stays defined once, in CSS.
     */
    const onAnchorClick = (event: MouseEvent) => {
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
      if (!(link instanceof HTMLAnchorElement)) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector<HTMLElement>(hash)
      if (!target) return

      event.preventDefault()

      const run = () => {
        if (lenis) lenis.scrollTo(target)
        else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        /* Keep the address bar honest without letting the browser jump. */
        history.replaceState(null, '', hash)
      }

      /* Tapping a link in the mobile overlay closes it, and the close restores
         body scrolling. Scrolling before that lands nowhere, so wait for the
         unlock when one is in force. */
      if (document.body.style.overflow === 'hidden') window.setTimeout(run, 320)
      else run()
    }

    document.addEventListener('click', onAnchorClick, true)

    /* requestIdleCallback is absent on older Safari; the timeout is the
       fallback. Checked off window rather than via the typed binding, which TS
       declares as always present. */
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 1)

    return () => {
      cancelled = true
      document.removeEventListener('click', onAnchorClick, true)
      if (hasIdle) window.cancelIdleCallback(handle as number)
      else window.clearTimeout(handle as number)
      cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [])

  return null
}
