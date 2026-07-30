'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useId, useState } from 'react'
import { ease } from '@/lib/motion'
import { faqSection } from '@/lib/content'
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
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()
  const baseId = useId()

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
                    <span className="text-xs font-semibold text-ink/35">
                      {String(i + 1).padStart(2, '0')}.
                    </span>

                    <span className="flex-1 text-base font-medium">
                      {item.question}
                    </span>

                    {/* Plus rotating into a cross: the horizontal bar stays put
                        while the vertical one turns, so it never looks doubled. */}
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.25, ease }}
                        className="absolute h-[1.5px] w-3.5 rounded-full bg-current"
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduced ? { height: 'auto' } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? { height: 'auto' } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-8 text-sm leading-relaxed text-ink/60 md:pl-9">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
