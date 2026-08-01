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

    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined
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

    /* requestIdleCallback is absent on older Safari; the timeout is the
       fallback. Checked off window rather than via the typed binding, which TS
       declares as always present. */
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 1)

    return () => {
      cancelled = true
      if (hasIdle) window.cancelIdleCallback(handle as number)
      else window.clearTimeout(handle as number)
      cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [])

  return null
}
