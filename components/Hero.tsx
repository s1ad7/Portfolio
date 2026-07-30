'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ease, spring } from '@/lib/motion'
import { hero } from '@/lib/content'
import { Pill } from './ui/Pill'

/** Looping double chevron. In the reference it settles in on a 2.5s delay. */
function ScrollCue() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0.001, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: reduced ? 0 : 2.5 }}
      className="flex flex-col items-center text-ink/30"
      aria-hidden="true"
    >
      {[0, 1].map((i) => (
        <motion.svg
          key={i}
          width="26"
          height="14"
          viewBox="0 0 26 14"
          fill="none"
          className="-mt-1.5"
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2.5 + i * 0.12,
          }}
        >
          <path
            d="M1 1L13 12L25 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </motion.div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()

  /* Hand-tuned entrance order: badge, headline, subline, then the cue. */
  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0.001, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring, delay: reduced ? 0 : delay },
  })

  return (
    <section
      id="top"
      /* A grey rounded card inset from the viewport edges, sitting below the
         80px nav bar. Matches the reference's 1392x772 panel at y=104. */
      className="shell relative mt-[4.5rem] flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center overflow-hidden bg-panel px-6 py-20 md:mt-24"
    >
      {/* Dotted grid, faded at the edges so it never fights the headline. */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_20%,transparent_75%)]"
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
               makes it read as part of the headline. 12px radius, white frame,
               layered shadow, as measured on the reference. */
            className="relative inline-block h-[1.5em] w-[1.44em] shrink-0 overflow-hidden rounded-[0.13em] border-[0.04em] border-white bg-white shadow-ramp-lg"
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

        <motion.p
          {...rise(0.25)}
          className="max-w-xl text-base leading-[1.8] text-ink/70"
        >
          {hero.subline}
        </motion.p>
      </div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease, delay: reduced ? 0 : 2.3 }}
        className="absolute bottom-10"
      >
        <ScrollCue />
      </motion.div>
    </section>
  )
}
