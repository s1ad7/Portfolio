'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Inertial scrolling, which is a large part of why the reference feels the way
 * it does. Disabled outright when the visitor asks for reduced motion, since
 * hijacking the scroll is exactly the kind of thing that setting is for.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      // Matches the reference's easing character: quick to start, soft to settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
