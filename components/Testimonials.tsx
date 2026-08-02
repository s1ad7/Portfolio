import { getContent } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { publishedTestimonials } from '@/lib/testimonials'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'
import { Container } from './ui/Section'

/**
 * What clients said.
 *
 * Placed immediately before the contact form on purpose: the guidance on
 * testimonial pages is to put the call to action straight after the strongest
 * story, while the reader still believes it.
 *
 * The whole section disappears when there is nothing attributable to show.
 * That is not defensive coding, it is the point: an unattributed quote reads as
 * invented and drags down the credibility of the real numbers elsewhere on the
 * page, so no quotes is strictly better than hollow ones.
 *
 * The layout answers a specific complaint: as plain paragraphs with a small
 * grey line underneath, these read as pasted messages rather than quotations,
 * and it was not obvious anyone was being quoted at all. Three things fix that,
 * none of which need a photograph Saad does not have: an explicit quote mark, a
 * monogram that reads as a speaker, and a line saying what each company IS so a
 * stranger can place them.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  const items = publishedTestimonials
  if (items.length === 0) return null

  const copy = getContent(locale).testimonialsSection

  return (
    <section id="testimonials" className="shell scroll-mt-28 bg-panel py-16 md:py-28 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-4 md:items-center md:text-center">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl text-4xl md:text-5xl">{copy.heading}</h2>
        </Reveal>

        {/* items-stretch plus h-full at every level down to the card: without it
            a shorter quote leaves its card floating at a different height, which
            is what made the row look broken. */}
        <ul
          className={`mt-10 grid items-stretch gap-6 md:mt-16 ${
            items.length === 1
              ? 'mx-auto max-w-2xl'
              : items.length === 2
                ? 'lg:grid-cols-2'
                : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {items.map((item, index) => (
            <li key={item.id} className="h-full">
              <Reveal delay={index * 0.06} className="h-full">
                <figure className="flex h-full flex-col gap-5 rounded-panel bg-white p-6 shadow-ramp md:p-7">
                  {/* Signals a quotation before a word is read. */}
                  <span aria-hidden="true" className="font-display text-5xl leading-[0.5] text-line">
                    &ldquo;
                  </span>

                  <blockquote className="copy text-base text-ink">
                    <p>{item.quote[locale]}</p>
                  </blockquote>

                  <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-5">
                    {/* A monogram, not a stock avatar: it reads as a speaker
                        without pretending to be a photograph of one. */}
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm text-white"
                    >
                      {item.company.slice(0, 2).toUpperCase()}
                    </span>

                    <span className="flex min-w-0 flex-col">
                      <span className="font-display text-base text-ink">
                        {item.author ?? item.company}
                      </span>
                      <span className="font-ui text-sm text-muted">
                        {item.author
                          ? [item.role, item.company].filter(Boolean).join(', ')
                          : item.descriptor[locale]}
                      </span>
                    </span>

                    {/* Part of the proof: the reader can open the site the quote
                        is about and check it. */}
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${copy.seeTheWork}: ${item.company}`}
                        className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-200 ease-signature hover:bg-panel hover:text-ink"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 11L11 5M11 5H6M11 5v5" />
                        </svg>
                      </a>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
