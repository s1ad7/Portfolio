'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { spring, useReveal, viewportOnce } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  /** Seconds to hold before animating, for hand-tuned staggers. */
  delay?: number
  className?: string
  /** Render as a child of a parent stagger container instead of self-triggering. */
  asChild?: boolean
}

/**
 * The single scroll-reveal used across every section. Centralising it here is
 * what keeps the motion consistent; the old site repeated bespoke
 * initial/whileInView props in each component and they had drifted apart.
 *
 * Under reduced motion the variants collapse to the final state, so content
 * appears immediately rather than waiting on an animation that should not run.
 */
export function Reveal({ children, delay = 0, className, asChild = false }: RevealProps) {
  const { variants, reduced } = useReveal()

  if (asChild) {
    return (
      <motion.div variants={variants} className={className}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={reduced ? { duration: 0 } : { ...spring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
