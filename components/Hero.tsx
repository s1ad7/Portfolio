'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { DURATION, EASE, gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { useContent } from './ContentProvider'
import { Pill } from './ui/Pill'

const cue = '[data-hero-cue]'

export function Hero() {
  const { content } = useContent()
  const { hero } = content

  const scope = useRef<HTMLElement>(null)

  /* Only the scroll cue is animated from JS. The hero's own reveal is CSS (see
     globals.css): it is above the fold, and gating it on GSAP cost 3.7s of
     Largest Contentful Paint on a throttled phone. */
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(cue, { opacity: 1, y: 0 })
        return
      }

      /* The reference's one page-load flourish: a double chevron at the foot of
         the hero, appearing on a 2.5s delay, then breathing. */
      gsap.fromTo(
        cue,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: DURATION, ease: EASE, delay: 2.5 }
      )
      gsap.to(cue, {
        y: 6,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.5 + DURATION,
      })
    },
    { scope }
  )

  return (
    <section
      ref={scope}
      id="top"
      /* A grey rounded card inset from the viewport edges, sitting below the
         80px nav bar. Matches the reference's 1392x772 panel at y=104. */
      className="shell relative mt-[4.5rem] flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center overflow-hidden bg-panel px-6 py-20 md:mt-[6.5rem] md:min-h-[calc(100svh-8rem)]"
    >
      {/* Dotted grid, faded at the edges so it never fights the headline. */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_25%,transparent_80%)]"
      />

      <div className="relative flex flex-col items-center gap-8 text-center">
        <div data-hero-badge>
          <Pill variant="badge">{hero.badge}</Pill>
        </div>

        {/* The signature element: the portrait sits inline inside the headline,
            between the greeting and the name, tilted with a white border. */}
        <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-5xl leading-[1.2] md:text-7xl lg:text-8xl">
          <span data-hero-title>{hero.greeting}</span>

          <span
            data-hero-portrait
            /* Measured off the reference: 169x175 against a 96px headline, so
               1.76em x 1.82em, tilted +4deg (matrix sin 0.0698), radius 12px at
               that size. It overflows the line box by ~30px top and bottom,
               which is what gives it presence next to the type. */
            className="relative inline-block h-[1.82em] w-[1.76em] shrink-0 rotate-4 overflow-hidden rounded-[0.125em] border-[0.045em] border-white bg-white shadow-portrait transition-transform duration-500 ease-signature hover:rotate-0"
          >
            <Image
              src="/hero-portrait.jpg"
              alt={hero.portraitAlt}
              fill
              priority
              sizes="(max-width: 768px) 130px, 220px"
              className="object-cover object-[48%_32%]"
            />
          </span>

          <span data-hero-title>{hero.headline}</span>
        </h1>

        <p data-hero-sub className="max-w-xl text-base copy text-muted">
          {hero.subline}
        </p>
      </div>

      {/* Kept faint: on the reference this is a whisper, not a call to action. */}
      <div
        data-hero-cue
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-line opacity-0"
      >
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 3 14 9 14-9" />
          <path d="m3 13 14 9 14-9" />
        </svg>
      </div>
    </section>
  )
}
