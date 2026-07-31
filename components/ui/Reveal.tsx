'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, useGSAP, DURATION, EASE } from '@/lib/gsap'

type RevealProps = {
  children: ReactNode
  /** Seconds to hold before animating, for hand-tuned staggers. */
  delay?: number
  /** Stagger applied across direct children instead of animating as one block. */
  stagger?: number
  className?: string
}

/**
 * The single scroll reveal used across every section: fade and rise 24px as the
 * element enters the viewport.
 *
 * Under reduced motion the element is set to its final state rather than the
 * tween being skipped. Skipping a `from` tween leaves the element at its start
 * values forever, which is how scroll reveals end up invisible instead of
 * merely still.
 */
export function Reveal({ children, delay = 0, stagger, className }: RevealProps) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = scope.current
      if (!el) return

      const targets = stagger ? Array.from(el.children) : el
      if (Array.isArray(targets) && targets.length === 0) return

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.from(targets, {
        opacity: 0,
        y: 24,
        duration: DURATION,
        ease: EASE,
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
    },
    { scope, dependencies: [delay, stagger] }
  )

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}
