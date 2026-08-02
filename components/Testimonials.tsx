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

        <ul
          className={`mt-10 grid gap-6 md:mt-16 ${
            items.length === 1 ? 'mx-auto max-w-2xl' : 'lg:grid-cols-2'
          }`}
        >
          {items.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 0.06}>
                <figure className="flex h-full flex-col gap-5 rounded-panel bg-white p-6 shadow-ramp md:p-8">
                  <blockquote className="copy text-lg text-ink">
                    <p>{item.quote[locale]}</p>
                  </blockquote>

                  <figcaption className="mt-auto flex flex-col gap-0.5">
                    {item.author && (
                      <span className="font-display text-base text-ink">{item.author}</span>
                    )}
                    <span className="font-ui text-sm text-muted">
                      {[item.role, item.company].filter(Boolean).join(', ')}
                    </span>
                    {/* The link is part of the proof: a reader can open the site
                        and see the work the quote is about. */}
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-my-2 mt-0 flex min-h-11 w-fit items-center font-ui text-sm text-accent-text underline-offset-4 hover:underline"
                      >
                        {copy.seeTheWork}
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
