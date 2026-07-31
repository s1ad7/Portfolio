'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, prefersReducedMotion, SplitText, useGSAP } from '@/lib/gsap'
import { hero } from '@/lib/content'
import { Pill } from './ui/Pill'

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      const badge = '[data-hero-badge]'
      const portrait = '[data-hero-portrait]'
      const sub = '[data-hero-sub]'
      const title = scope.current?.querySelector<HTMLElement>('[data-hero-title]')

      if (reduced) {
        gsap.set([badge, portrait, sub], { opacity: 1, y: 0, scale: 1, rotate: -4 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(badge, { opacity: 0, y: 14, duration: 0.7 })

      /* The headline splits per character. SplitText keeps the original text
         available to assistive tech, so this does not cost the h1 its meaning. */
      let split: SplitText | undefined
      if (title) {
        split = SplitText.create(title, {
          type: 'chars',
          charsClass: 'inline-block',
          onSplit: (self) =>
            tl.from(
              self.chars,
              { opacity: 0, yPercent: 55, duration: 0.7, stagger: 0.022 },
              '-=0.45'
            ),
        })
      }

      // The portrait settles into its resting tilt rather than starting there.
      tl.from(
        portrait,
        { opacity: 0, scale: 0.88, rotate: -12, duration: 0.85, ease: 'back.out(1.4)' },
        '-=0.5'
      )
      tl.from(sub, { opacity: 0, y: 14, duration: 0.7 }, '-=0.55')

      return () => split?.revert()
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
            /* Sized to the line box rather than the cap height, which is what
               makes it read as part of the headline. */
            className="relative inline-block h-[1.5em] w-[1.44em] shrink-0 -rotate-4 overflow-hidden rounded-[0.13em] border-[0.045em] border-white bg-white shadow-portrait transition-transform duration-500 ease-signature hover:rotate-0"
          >
            <Image
              src="/portrait.png"
              alt={hero.portraitAlt}
              fill
              priority
              sizes="220px"
              className="object-cover object-[50%_28%]"
            />
          </span>

          <span data-hero-title>{hero.headline}</span>
        </h1>

        <p data-hero-sub className="max-w-xl text-base leading-[1.8] text-muted">
          {hero.subline}
        </p>
      </div>
    </section>
  )
}
