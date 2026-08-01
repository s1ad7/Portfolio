'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

/* Registered once at module scope. Registering inside a component re-runs on
   every mount, which GSAP warns about. */
gsap.registerPlugin(CustomEase, ScrollTrigger, useGSAP)

export { CustomEase, gsap, ScrollTrigger, useGSAP }

/**
 * The site's motion signature, carried over from the measurements taken off the
 * reference: an overdamped response settling around 750ms with no overshoot.
 * Expressed as an eased tween, which is how GSAP models it.
 */
/**
 * The reference's reveal is a framer-motion spring (stiffness 150, damping 30,
 * mass 1), overdamped at zeta about 1.22, so it decays without overshoot.
 *
 * This is that curve fitted by least squares to the frame-by-frame trace in
 * docs/reference-spec.md, rather than a power ease that merely looks similar.
 * It reproduces every measured sample to within 0.008:
 *
 *   t      measured   this ease
 *   0.139    0.291      0.292
 *   0.272    0.607      0.610
 *   0.536    0.889      0.881
 *   0.801    0.969      0.977
 */
CustomEase.create('refSpring', 'M0,0 C0.22,0.24 0.12,0.96 1,1')

export const EASE = 'refSpring'
export const DURATION = 0.75

/** Measured travel on the reference's reveal. */
export const REVEAL_Y = 24

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
