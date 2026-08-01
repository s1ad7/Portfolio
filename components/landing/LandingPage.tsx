import Link from 'next/link'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Reveal } from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'
import { LandingSchema } from './LandingSchema'
import { getContent } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import type { LandingPage as LandingPageData } from '@/lib/landing/pages'

/**
 * A local landing page.
 *
 * Structure follows what converts on a service page: the promise and the city
 * in the h1, three concrete commitments immediately under it, then the
 * substance, then proof, then a single way to act. Real project cards are
 * reused rather than described, because showing seven live sites beats any
 * paragraph claiming experience.
 */
export function LandingPage({ page, locale }: { page: LandingPageData; locale: Locale }) {
  const copy = page.copy[locale]
  const content = getContent(locale)
  const home = `/${locale}`

  return (
    <>
      <LandingSchema page={page} locale={locale} />
      <Navbar />

      <main>
        <section className="shell mt-[4.5rem] bg-panel px-6 py-16 md:mt-[6.5rem] md:py-24">
          <Container className="!px-0">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <h1 className="max-w-3xl text-4xl md:text-6xl">{copy.h1}</h1>
              <p className="copy max-w-2xl text-base text-body">{copy.intro}</p>

              <ul className="mt-2 flex flex-col gap-3">
                {copy.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    {/* Decorative: the text beside it already carries the meaning. */}
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white"
                    >
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3.5 8.5 3 3 6-7" />
                      </svg>
                    </span>
                    <span className="copy text-base text-body">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Pill href="#contact" variant="dark">
                  {content.about.cta.label}
                </Pill>
                <Link
                  href={home}
                  className="font-ui text-sm text-muted underline-offset-4 transition-colors duration-200 ease-signature hover:text-ink hover:underline"
                >
                  {content.seeAllWork}
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="shell bg-white px-6 py-16 md:py-24">
          <Container className="!px-0">
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {copy.sections.map((block, index) => (
                <Reveal key={block.heading} delay={index * 0.06} className="flex flex-col gap-3">
                  <h2 className="text-2xl md:text-[1.75rem]">{block.heading}</h2>
                  <p className="copy text-base text-body">{block.body}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* The proof. Live work outranks any claim about experience. */}
        <Projects locale={locale} />

        <section className="shell bg-panel px-6 py-16 md:py-24">
          <Container className="!px-0">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>{content.faqSection.eyebrow}</Eyebrow>
              <h2 className="max-w-2xl text-4xl md:text-5xl">{copy.ctaHeading}</h2>
              <p className="copy max-w-2xl text-base text-body">{copy.ctaBody}</p>
            </Reveal>

            <dl className="mt-10 flex flex-col divide-y divide-line border-t border-line">
              {copy.faq.map((item) => (
                <div key={item.question} className="flex flex-col gap-2 py-6">
                  <dt className="font-display text-lg text-ink">{item.question}</dt>
                  <dd className="copy max-w-2xl text-base text-body">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <Contact />
      </main>

      <Footer locale={locale} />
    </>
  )
}
