import Image from 'next/image'
import { about } from '@/lib/content'
import { Container } from './ui/Section'
import { Eyebrow } from './ui/Eyebrow'
import { Pill } from './ui/Pill'
import { Reveal } from './ui/Reveal'
import { StatBand } from './StatBand'

/**
 * About, rebuilt around three findings from conversion research rather than the
 * usual biography:
 *
 *   1. Faces first. Eye-tracking shows visitors find faces before anything
 *      else on a page, and a photo measurably raises perceived trust. So the
 *      portrait sits in the right column, where the reading eye lands.
 *   2. Numbers beat adjectives, and these are verifiable one scroll up: two of
 *      the three stats are derived from the projects list itself.
 *   3. Visitors scan. One short paragraph, a badge, a CTA. No essay.
 */
export function About() {
  return (
    <section id="about" className="shell scroll-mt-28 bg-panel py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div className="flex flex-col items-start gap-6">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>{about.eyebrow}</Eyebrow>
              <h2 className="text-4xl md:text-5xl">
                <span className="block">{about.headingLineOne}</span>
                <span className="block text-faint">{about.headingLineTwo}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col items-start gap-6">
              <p className="max-w-xl text-base leading-[1.8] text-body">{about.paragraphs[0]}</p>
              <Pill href={about.cta.href} variant="dark">
                {about.cta.label}
              </Pill>
            </Reveal>
          </div>

          {/* The face. Slight tilt, echoing the hero portrait, straightening on
              hover the same way. */}
          <Reveal delay={0.12} className="justify-self-center lg:justify-self-end">
            <figure className="w-64 -rotate-2 rounded-panel bg-white p-3 pb-5 shadow-ramp-lg transition-transform duration-500 ease-signature hover:rotate-0 sm:w-72">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card">
                <Image
                  src="/portrait.png"
                  alt={about.portraitAlt}
                  fill
                  sizes="288px"
                  className="object-cover object-[50%_28%]"
                />
              </div>
              <figcaption className="flex flex-col gap-1 px-2 pt-4">
                <span className="font-display text-xl text-ink">Saad Ifli</span>
                <span className="text-sm text-muted">{about.badge}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <StatBand />
        </Reveal>
      </Container>
    </section>
  )
}
