'use client'

import { useReducedMotion } from 'framer-motion'
import type { Transition, Variants } from 'framer-motion'

/**
 * The reference site's motion signature, read off its own appear-animation
 * config. Everything on the page reveals with this one spring so the whole
 * site feels like a single system rather than eight separately-animated blocks.
 */
export const spring: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 30,
  mass: 1,
}

/** The reference's easing curve, for tweens and CSS transitions. */
export const ease = [0.44, 0, 0.56, 1] as const

/**
 * Fade and rise. The reference starts at opacity 0.001 rather than 0 so the
 * browser keeps the layer composited and the text does not re-rasterise
 * mid-animation.
 */
export const reveal: Variants = {
  hidden: { opacity: 0.001, y: 12 },
  visible: { opacity: 1, y: 0, transition: spring },
}

/**
 * Parent variant that walks its children through `reveal` in sequence. Used for
 * project lists, skill cards and FAQ rows.
 */
export const revealStagger = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
})

/** Shared viewport config: reveal once, slightly before the element is centred. */
export const viewportOnce = { once: true, margin: '-80px' } as const

/**
 * Same variant names, but both states are the final state. Used instead of
 * `reveal` when the visitor has asked for reduced motion.
 */
const staticReveal: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
}

/**
 * Returns the reveal variants appropriate to the visitor's motion preference.
 *
 * Always returning variants (rather than conditionally rendering a plain div in
 * place of a motion.div) is deliberate. React reuses the DOM node when the
 * element type is unchanged, so swapping the component out leaves
 * framer-motion's imperatively-set inline opacity and transform behind with
 * nothing left to clear them, and the content stays invisible.
 */
export function useReveal(): { variants: Variants; reduced: boolean } {
  const reduced = useReducedMotion() ?? false
  return { variants: reduced ? staticReveal : reveal, reduced }
}
