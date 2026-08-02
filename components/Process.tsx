'use client'

import { useRef, useState } from 'react'
import { gsap, prefersReducedMotion, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { useContent } from './ContentProvider'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { Container } from './ui/Section'

/**
 * The process, driven by scroll.
 *
 * This section is doing two jobs at once. It answers the question every client
 * asks ("how does this actually go?"), and it demonstrates the scroll-driven
 * work they are hiring for. A claim about motion skill is worth less than a
 * page that performs it.
 *
 * Three deliberate constraints, each learned the hard way on this project:
 *
 *   The pin is CSS `sticky`, not GSAP's pinning. GSAP's pin injects a spacer
 *   element and rewrites layout, which is where pinned sections usually break
 *   at a breakpoint or fight a reveal animation. Sticky cannot break layout
 *   because it never changes it.
 *
 *   ScrollTrigger only reports which step is active. No scrub, no transform
 *   driven frame by frame, so there is nothing to desynchronise and the main
 *   thread stays free.
 *
 *   Desktop only, and only when motion is welcome. Sticky panels on a phone
 *   fight the browser's own scroll and hide content behind the address bar,
 *   so mobile gets an honest numbered list. The gate is `motion-safe:lg:`,
 *   not `lg:` alone: gating on width only is exactly how a reduced-motion
 *   visitor on a desktop ends up with a stack of invisible panels.
 */
export function Process() {
  const { content } = useContent()
  const section = content.processSection
  const steps = section.steps

  const scope = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (!window.matchMedia('(min-width: 1024px)').matches) return

      const items = gsap.utils.toArray<HTMLElement>('[data-step]')
      const triggers = items.map((el, index) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: ({ isActive }) => {
            if (isActive) setActive(index)
          },
        })
      )

      return () => triggers.forEach((t) => t.kill())
    },
    { scope }
  )

  return (
    <section id="process" className="shell scroll-mt-28 bg-panel py-16 md:py-28 lg:py-32">
      <Container>
        <div ref={scope} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* The sticky half. On mobile it is simply the section header. */}
          <div className="motion-safe:lg:sticky motion-safe:lg:top-32 motion-safe:lg:self-start">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <h2 className="text-4xl md:text-5xl">{section.heading}</h2>
              <p className="copy max-w-md text-base text-body">{section.intro}</p>
            </Reveal>

            {/* The progress rail, desktop only: on mobile each step already
                carries its own number, so this would just repeat them. */}
            <ol
              data-rail
              className="mt-10 hidden motion-safe:lg:flex motion-safe:lg:flex-col motion-safe:lg:gap-1"
            >
              {steps.map((step, index) => {
                const isActive = index === active
                return (
                  <li key={step.title} data-rail-item data-active={isActive} className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`h-px transition-all duration-500 ease-signature ${
                        isActive ? 'w-10 bg-ink' : 'w-4 bg-line'
                      }`}
                    />
                    <span
                      /* muted, not faint: 14px is small text and faint measures
                         3.17:1. The active state is carried by weight and by the
                         rail length beside it, not by colour alone. */
                      className={`font-ui text-sm transition-colors duration-500 ease-signature ${
                        isActive ? 'font-medium text-ink' : 'text-muted'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')} {step.title}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* The steps. Each is a normal block: it scrolls, nothing is pinned,
              and the sticky column above simply stays in view beside them. */}
          <ol className="flex flex-col gap-10 lg:gap-24">
            {steps.map((step, index) => (
              <li key={step.title} data-step>
                <Reveal className="flex flex-col gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-5xl leading-none text-line md:text-6xl"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl md:text-[1.75rem]">{step.title}</h3>
                  <p className="copy max-w-xl text-base text-body">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
