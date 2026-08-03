import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Reveal } from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'
import { PrintButton } from './PrintButton'
import { getContent, getStats } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { projects } from '@/lib/site'
import { site } from '@/lib/site'

/**
 * The page for hiring teams, which is a different reader from a client.
 *
 * A client asks "will this make me money?". A hiring manager asks, roughly in
 * this order: are you available, can we overlap, can we communicate, have you
 * shipped anything, and what do you use. So the page answers exactly that,
 * in that order, above the fold, instead of making them infer it from a
 * portfolio built to sell projects.
 *
 * It doubles as the CV. Printing it produces a clean one-page document with the
 * navigation, footer and decoration stripped, so there is no separate PDF to
 * keep in sync and it can never contradict the site.
 */
export function HirePage({ locale }: { locale: Locale }) {
  const content = getContent(locale)
  const copy = content.hire
  const stats = getStats(content)

  return (
    <>
      <div data-print-hide>
        <Navbar />
      </div>

      <main className="print:pt-0">
        <section className="shell mt-[4.5rem] bg-panel px-6 py-16 md:mt-[6.5rem] md:py-24 print:mt-0 print:bg-white print:py-0">
          <Container className="!px-0">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow>{copy.eyebrow}</Eyebrow>

              {/* Name and role are the print header: on screen the wordmark in
                  the navbar covers it, but a printed page has no navbar. */}
              <div className="hidden print:block">
                <h1 className="text-3xl font-semibold">{site.name}</h1>
                <p className="text-base text-body">
                  {content.meta.role} · {site.email} · {site.links.github}
                </p>
              </div>

              <h1 className="max-w-3xl text-4xl md:text-6xl print:hidden">{copy.h1}</h1>
              <p className="copy max-w-2xl text-base text-body">{copy.intro}</p>

              {/* Availability first: it is the one thing that makes the rest of
                  the page worth reading, and the one thing a recruiter checks
                  before anything else. */}
              <div className="flex w-fit items-center gap-3 rounded-full border border-line bg-white px-4 py-2">
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="font-display text-base text-ink">{copy.availability.value}</span>
              </div>
              <p className="text-sm text-muted">{copy.availability.detail}</p>

              <div className="mt-2 flex flex-wrap items-center gap-4" data-print-hide>
                {/* Not the homepage CTA: "tell me about your project" is what
                    you say to a client. A hiring manager has a role, not a
                    project. */}
                <Pill href="#contact" variant="dark">
                  {copy.ctaLabel}
                </Pill>
                <PrintButton label={copy.cvLabel} hint={copy.cvHint} />
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="shell bg-white px-6 py-16 md:py-24 print:py-4">
          <Container className="!px-0">
            <Reveal>
              <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4 print:gap-4">
                {copy.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1">
                    <dt className="font-ui text-sm text-muted">{fact.label}</dt>
                    <dd className="flex flex-col gap-1">
                      <span className="font-display text-lg text-ink">{fact.value}</span>
                      <span className="copy text-sm text-body">{fact.detail}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* The numbers already proven on the homepage, reused rather than
                restated, so the two pages can never disagree. */}
            <Reveal className="mt-12 border-t border-line pt-10 print:mt-6 print:pt-4">
              <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {stats.map((stat) => (
                  /* flex-col-reverse, not a <p> after the <dd>: a definition
                     list may only contain dt and dd inside its wrapper divs, so
                     the label is a real <dt> and CSS puts it under the value
                     where the design wants it. */
                  <div key={stat.label} className="flex flex-col-reverse gap-1">
                    <dt className="text-sm leading-snug text-muted">{stat.label}</dt>
                    <dd className="font-display text-4xl text-ink md:text-5xl print:text-2xl">
                      {stat.value}
                      {stat.suffix}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>

        <section className="shell bg-panel px-6 py-16 md:py-24 print:bg-white print:py-4">
          <Container className="!px-0">
            <Reveal className="flex flex-col gap-3">
              <h2 className="text-3xl md:text-4xl print:text-xl">{copy.stackHeading}</h2>
            </Reveal>

            <div className="mt-8 grid gap-8 md:grid-cols-3 print:mt-3 print:gap-4">
              {copy.stack.map((group, index) => (
                <Reveal key={group.group} delay={index * 0.05} className="flex flex-col gap-3">
                  <h3 className="font-ui text-sm text-muted">{group.group}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-white px-3 py-1 text-xs tracking-[0.03em] text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="shell bg-white px-6 py-16 md:py-24 print:py-4">
          <Container className="!px-0">
            <Reveal className="flex flex-col gap-3">
              <h2 className="text-3xl md:text-4xl print:text-xl">{copy.strengthsHeading}</h2>
            </Reveal>

            <div className="mt-8 grid gap-8 md:grid-cols-2 print:mt-3 print:gap-3">
              {copy.strengths.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05} className="flex flex-col gap-2">
                  <h3 className="text-xl print:text-base">{item.title}</h3>
                  <p className="copy text-base text-body print:text-sm">{item.body}</p>
                </Reveal>
              ))}
            </div>

            {/* Live work, printed as plain URLs: a printed page cannot be
                clicked, so the address has to be readable. */}
            <Reveal className="mt-12 border-t border-line pt-10 print:mt-6 print:pt-4">
              <h3 className="font-ui text-sm text-muted">{content.projectsSection.eyebrow}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 print:mt-2 print:gap-1">
                {projects.map((project) => (
                  <li key={project.slug} className="flex flex-wrap items-baseline gap-x-2">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-base text-ink underline-offset-4 hover:underline"
                    >
                      {project.title}
                    </a>
                    <span className="text-sm text-muted">
                      {project.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        <section
          id="contact"
          className="shell scroll-mt-28 bg-panel px-6 py-16 md:py-24 print:bg-white print:py-4"
        >
          <Container className="!px-0">
            <Reveal className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl print:text-xl">{copy.ctaHeading}</h2>
              <p className="copy max-w-2xl text-base text-body">{copy.ctaBody}</p>

              <ul className="mt-2 flex flex-col gap-2">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-lg text-ink underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-base text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {site.links.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ui text-base text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {site.links.github.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </li>
              </ul>

              <Link
                href={`/${locale}`}
                data-print-hide
                className="mt-4 w-fit font-ui text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                {content.seeAllWork}
              </Link>
            </Reveal>
          </Container>
        </section>
      </main>

      <div data-print-hide>
        <Footer locale={locale} />
      </div>
    </>
  )
}
