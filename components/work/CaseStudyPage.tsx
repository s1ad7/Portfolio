import Image from 'next/image'
import Link from 'next/link'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Reveal } from '@/components/ui/Reveal'
import { Container } from '@/components/ui/Section'
import { BeforeAfter } from './BeforeAfter'
import { getContent } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { projects } from '@/lib/site'
import type { CaseStudy } from '@/lib/work/cases'
import versions from '@/public/projects/versions.json'

/**
 * A case study.
 *
 * The comparison is the centrepiece and sits high, directly under the intro,
 * because the transformation is the argument. Everything below it explains a
 * decision the visitor has already seen the result of.
 */
export function CaseStudyPage({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const copy = study.copy[locale]
  const content = getContent(locale)
  const work = content.work

  const project = projects.find((p) => p.slug === study.projectSlug)
  if (!project) return null

  const version = (versions as Record<string, string>)[project.slug]
  const after = version ? `${project.image}?v=${version}` : project.image

  return (
    <>
      <Navbar />

      <main>
        <section className="shell mt-[4.5rem] bg-panel px-6 py-16 md:mt-[6.5rem] md:py-24">
          <Container className="!px-0">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <h1 className="max-w-3xl text-4xl md:text-6xl">{copy.h1}</h1>
              <p className="copy max-w-2xl text-base text-body">{copy.intro}</p>

              <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
                {copy.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1">
                    <dt className="font-ui text-sm text-muted">{fact.label}</dt>
                    <dd className="font-display text-lg text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Pill href={project.href} variant="dark">
                  {copy.visitLabel}
                </Pill>
                <Link
                  href={`/${locale}#projects`}
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
            {/* The comparison, when both images exist. A slider with one image
                is not a degraded slider, it is a broken one, so it is absent
                rather than half-rendered. The live screenshot still shows
                below either way. */}
            {study.beforeImage ? (
              <Reveal>
                <BeforeAfter
                  before={study.beforeImage}
                  after={after}
                  beforeLabel={work.before}
                  afterLabel={work.after}
                  alt={copy.h1}
                />
              </Reveal>
            ) : (
              <Reveal>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-panel bg-panel shadow-ramp">
                  <Image
                    src={after}
                    alt={copy.h1}
                    fill
                    sizes="(max-width: 1023px) 100vw, 1090px"
                    className="object-cover object-top"
                  />
                </div>
              </Reveal>
            )}

            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {copy.sections.map((block, index) => (
                <Reveal key={block.heading} delay={index * 0.06} className="flex flex-col gap-3">
                  <h2 className="text-2xl md:text-[1.75rem]">{block.heading}</h2>
                  <p className="copy text-base text-body">{block.body}</p>
                </Reveal>
              ))}
            </div>

            {/* Renders only once a real outcome exists. */}
            {copy.outcome && (
              <Reveal className="mt-14 flex flex-col gap-3 border-t border-line pt-10">
                <h2 className="text-2xl md:text-[1.75rem]">{copy.outcome.heading}</h2>
                <p className="copy max-w-2xl text-base text-body">{copy.outcome.body}</p>
              </Reveal>
            )}
          </Container>
        </section>

        <Contact />
      </main>

      <Footer locale={locale} />
    </>
  )
}
