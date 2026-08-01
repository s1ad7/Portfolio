import Image from 'next/image'
import { getContent } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { Container } from './ui/Section'
import { Eyebrow } from './ui/Eyebrow'
import { Pill } from './ui/Pill'
import { Reveal } from './ui/Reveal'
import { StatBand } from './StatBand'
import { VideoResume } from './VideoResume'
import { GithubActivity } from './GithubActivity'

/**
 * About, rebuilt around three findings from conversion research rather than the
 * usual biography:
 *
 *   1. Faces first. Eye-tracking shows visitors find faces before anything
 *      else on a page, and a photo measurably raises perceived trust. So the
 *      portrait sits in the right column, where the reading eye lands.
 *   2. Numbers beat adjectives, and these are verifiable one scroll up: two of
 *      the three stats are derived from the projects list itself.
 *   3. Visitors scan. One short paragraph and a CTA. No essay.
 */
export function About({ locale }: { locale: Locale }) {
  const { about } = getContent(locale)

  return (
    <section id="about" className="shell scroll-mt-28 bg-panel py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div className="flex flex-col items-start gap-6">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>{about.eyebrow}</Eyebrow>
              {/* The one heading heavier than the rest, as on the reference
                  (w900 there; 800 is the heaviest Google Fonts ships). */}
              <h2 className="text-4xl font-extrabold md:text-5xl">
                <span className="block">{about.headingLineOne}</span>
                <span className="block text-faint">{about.headingLineTwo}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col items-start gap-6">
              {about.paragraphs.map((para: string) => (
                <p key={para.slice(0, 24)} className="max-w-xl text-base leading-[1.8] text-body">
                  {para}
                </p>
              ))}
              {/* The real CTA, and beside it the easter egg. Text only and
                  muted, so it reads as an aside rather than a second call to
                  action competing with the first. */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Pill href={about.cta.href} variant="dark">
                  {about.cta.label}
                </Pill>
                <VideoResume />
              </div>
            </Reveal>
          </div>

          {/* The face, as the reference does it: a framed photo, tilted a few
              degrees, and nothing else. No caption; the name is everywhere
              already and the positioning line lives in the headline. */}
          <Reveal delay={0.12} className="justify-self-center lg:justify-self-end">
            <div className="w-64 rotate-3 rounded-panel bg-white p-3 shadow-ramp-lg transition-transform duration-500 ease-signature hover:rotate-0 sm:w-72">
              <div className="relative aspect-square overflow-hidden rounded-card">
                <Image
                  src="/about-portrait.jpg"
                  alt={about.portraitAlt}
                  fill
                  sizes="288px"
                  /* Explicitly lazy. It sits well below the fold, and letting
                     the browser fetch it early made it the LCP element on
                     desktop, pushing LCP from 0.7s to 1.1s for a picture
                     nobody has scrolled to yet. */
                  loading="lazy"
                  className="object-cover object-[50%_38%]"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <StatBand />
        </Reveal>

        {/* Client-fetched; renders nothing until data arrives, and nothing at
            all if the profile cannot be reached. */}
        <GithubActivity />
      </Container>
    </section>
  )
}
