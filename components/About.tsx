import { about } from '@/lib/content'
import { Container } from './ui/Section'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'

/**
 * Mirrors the reference's About treatment: a two-line display headline, body
 * copy split by a small centred badge, then the focus points as a light column.
 * Left-aligned rather than centred, which is how the reference breaks up the
 * rhythm of the page.
 */
export function About() {
  return (
    <section id="about" className="shell scroll-mt-28 bg-panel py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-4xl md:text-5xl">
                <span className="block">{about.headingLineOne}</span>
                <span className="block text-ink/40">{about.headingLineTwo}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col items-start gap-6">
              <p className="max-w-xl text-base leading-relaxed text-ink/70">
                {about.paragraphs[0]}
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 label-caps">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {about.badge}
              </span>

              <p className="max-w-xl text-base leading-relaxed text-ink/70">
                {about.paragraphs[1]}
              </p>
            </Reveal>
          </div>

          {/* Focus points, each divided by a hairline rule. */}
          <Reveal delay={0.15} className="lg:pt-24">
            <ul className="flex flex-col rounded-panel border border-line/70 bg-panel/60">
              {about.focus.map((item, i) => (
                <li
                  key={item.title}
                  className={`flex flex-col gap-2 p-6 md:p-8 ${
                    i > 0 ? 'border-t border-line/70' : ''
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-semibold text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/60">{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
