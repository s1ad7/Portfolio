'use client'

import { gsap, prefersReducedMotion, useGSAP, EASE_UI } from '@/lib/gsap'
import { useId, useRef, useState } from 'react'
import { useContent } from './ContentProvider'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

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
    <Section
      id="faq"
      eyebrow={faqSection.eyebrow}
      heading={faqSection.heading}
      intro={faqSection.intro}
      tone="panel"
    >
      <Reveal className="mx-auto max-w-3xl">
        <ul className="border-t border-line">
          {faqSection.items.map((item, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-panel-${i}`
            const buttonId = `${baseId}-button-${i}`

            return (
              <li key={item.question} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 py-6 text-left transition-colors duration-200 ease-signature hover:text-accent"
                  >
                    <span className="text-xs font-semibold text-faint">
                      {String(i + 1).padStart(2, '0')}.
                    </span>

                    <span className="flex-1 font-body text-base font-medium">
                      {item.question}
                    </span>

                    {/* Plus rotating into a cross: the horizontal bar stays put
                        while the vertical one turns, so it never looks doubled. */}
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                      <span
                        className={`absolute h-[1.5px] w-3.5 rounded-full bg-current transition-transform duration-250 ease-signature ${
                          isOpen ? 'rotate-0' : 'rotate-90'
                        }`}
                      />
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
                  <p className="pb-6 pl-8 text-sm leading-relaxed text-muted md:pl-9">
                    {item.answer}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
