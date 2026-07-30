'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { spring } from '@/lib/motion'
import { hero } from '@/lib/content'
import { Pill } from './ui/Pill'

export function Hero() {
  const reduced = useReducedMotion()

  /* Hand-tuned entrance order: badge, headline, portrait, subline. */
  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0.001, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring, delay: reduced ? 0 : delay },
  })

  return (
    <section
      id="top"
      /* A grey rounded card inset from the viewport edges, sitting below the
         80px nav bar. Matches the reference's 1392x772 panel at y=104, which
         leaves a matching 24px of white below the fold. */
      className="shell relative mt-[4.5rem] flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center overflow-hidden bg-panel px-6 py-20 md:mt-[6.5rem] md:min-h-[calc(100svh-8rem)]"
    >
      {/* Dotted grid, faded at the edges so it never fights the headline. */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_25%,transparent_80%)]"
      />

      <div className="relative flex flex-col items-center gap-8 text-center">
        <motion.div {...rise(0.05)}>
          <Pill variant="badge">{hero.badge}</Pill>
        </motion.div>

        {/* The signature element: the portrait sits inline inside the headline,
            between the greeting and the name, tilted with a white border. */}
        <motion.h1
          {...rise(0.15)}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-5xl leading-[1.2] md:text-7xl lg:text-8xl"
        >
          <span>{hero.greeting}</span>

          <motion.span
            initial={reduced ? undefined : { opacity: 0.001, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ ...spring, delay: reduced ? 0 : 0.3 }}
            whileHover={reduced ? undefined : { rotate: 0, scale: 1.04 }}
            /* Sized to the line box rather than the cap height, which is what
               makes it read as part of the headline. */
            className="relative inline-block h-[1.5em] w-[1.44em] shrink-0 overflow-hidden rounded-[0.13em] border-[0.045em] border-white bg-white shadow-portrait"
          >
            <Image
              src="/portrait.png"
              alt={hero.portraitAlt}
              fill
              priority
              sizes="220px"
              className="object-cover object-[50%_28%]"
            />
          </motion.span>

          <span>{hero.headline}</span>
        </motion.h1>

        <motion.p {...rise(0.25)} className="max-w-xl text-base leading-[1.8] text-muted">
          {hero.subline}
        </motion.p>
      </div>
    </section>
  )
}
