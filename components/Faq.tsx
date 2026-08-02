'use client'

import { gsap, prefersReducedMotion, useGSAP, EASE_UI } from '@/lib/gsap'
import { useId, useRef, useState } from 'react'
import { useContent } from './ContentProvider'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { Container } from './ui/Section'

/**
 * Numbered accordion list, matching the reference's "01." prefixes and hairline
 * dividers. Single-open behaviour, as in the reference.
 *
 * Built on a real <button> with aria-expanded/aria-controls so it works from the
 * keyboard and reads correctly to a screen reader.
 */
export function Faq() {
  const { content } = useContent()
  const { faqSection } = content

  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Height is animated rather than toggled so the list does not jump. `auto` is
     resolved by GSAP at tween time, then locked back to a number, which keeps
     the closed state measurable for the next open. */
  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      panelRefs.current.forEach((el, i) => {
        if (!el) return
        const shouldOpen = open === i
        if (reduced) {
          gsap.set(el, { height: shouldOpen ? 'auto' : 0 })
          return
        }
        gsap.to(el, {
          height: shouldOpen ? 'auto' : 0,
          duration: 0.32,
          ease: EASE_UI,
        })
      })
    },
    { dependencies: [open] }
  )

  return (
    /* White, not panel. The sections alternate white and grey down the page,
       and inserting Process (grey) directly above left two grey blocks
       touching, which reads as one section with a seam through it. */
    <section id="faq" className="shell scroll-mt-28 bg-white py-16 md:py-28 lg:py-32">
      <Container>
        {/* The reference's FAQ is two columns: the header sits left and stays
            put, the questions run down the right as separate cards. Stacked and
            centred, as this was, it reads as a support page rather than part of
            a pitch. */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{faqSection.eyebrow}</Eyebrow>
            <h2 className="text-4xl md:text-5xl">{faqSection.heading}</h2>
            <p className="copy max-w-md text-base text-body">{faqSection.intro}</p>
          </Reveal>

          <Reveal>
            <ul className="flex flex-col gap-3">
              {faqSection.items.map((item, i) => {
                const isOpen = open === i
                const panelId = `${baseId}-panel-${i}`
                const buttonId = `${baseId}-button-${i}`

                return (
                  <li
                    key={item.question}
                    className={`overflow-hidden rounded-panel transition-colors duration-300 ease-signature ${
                      isOpen ? 'bg-panel' : 'bg-panel/70 hover:bg-panel'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                      >
                        <span className="flex-1 font-body text-base font-medium">
                          <span className="text-muted">{String(i + 1).padStart(2, '0')}.</span>{' '}
                          {item.question}
                        </span>

                        {/* Chevron rotating to point up when open, matching the
                            reference. */}
                        <span
                          aria-hidden="true"
                          className={`shrink-0 transition-transform duration-300 ease-signature ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6l5 5 5-5" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      ref={(el) => {
                        panelRefs.current[i] = el
                      }}
                      className="overflow-hidden"
                      style={{ height: 0 }}
                    >
                      <p className="copy px-5 pb-5 text-sm text-body md:px-6 md:pb-6">
                        {item.answer}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
