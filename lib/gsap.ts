'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

/* Registered once at module scope. Registering inside a component re-runs on
   every mount, which GSAP warns about. */
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }

/**
 * The site's motion signature, carried over from the measurements taken off the
 * reference: an overdamped response settling around 750ms with no overshoot.
 * Expressed as an eased tween, which is how GSAP models it.
 */
export const EASE = 'power3.out'
export const DURATION = 0.75

/** Shorter curve for hovers and small state changes. */
export const EASE_UI = 'power2.inOut'
export const DURATION_UI = 0.3

/**
 * Whether the visitor has asked for reduced motion.
 *
 * Read at animation time rather than cached in state: it is consulted inside
 * GSAP callbacks that run after mount, and a stale value there is what leaves
 * scroll-reveals stuck invisible.
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Standard scroll reveal: fade and rise as the element enters the viewport.
 *
 * Under reduced motion the elements are set to their final state immediately
 * instead of being animated. That distinction matters: simply skipping the
 * tween would leave anything with a `from` state invisible forever.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  options: { stagger?: number; y?: number; trigger?: Element | null } = {}
) {
  const { stagger = 0.08, y = 24, trigger } = options

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: 'transform' })
    return
  }

  return gsap.from(targets, {
    opacity: 0,
    y,
    duration: DURATION,
    ease: EASE,
    stagger,
    scrollTrigger: {
      trigger: trigger ?? (targets as Element),
      start: 'top 85%',
      once: true,
    },
  })
}
