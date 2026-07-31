import { projectsSection } from '@/lib/content'
import { ProjectShowcase } from './ProjectShowcase'
import { Container } from './ui/Section'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'

/**
 * Written out rather than using <Section> because the showcase needs the full
 * width of the card and its own vertical rhythm: the pinned variant is several
 * screens tall, so the usual `mt-16` spacing under the header does not apply.
 *
 * Note there is no `overflow-hidden` anywhere on the way down to the showcase.
 * A sticky element stops sticking the moment any ancestor clips overflow, which
 * is the usual reason a pinned section silently stops pinning.
 */
export function Projects() {
  return (
    /* No `shell` here, unlike every other section. The panels are meant to run
       edge to edge, and the shell's 24px inset plus 40px radius left a white
       gutter down both sides of what should be a full-bleed image. */
    <section id="projects" className="scroll-mt-28 bg-white pt-24 md:pt-32">
      <Container>
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{projectsSection.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl text-4xl md:text-5xl">{projectsSection.heading}</h2>
          <p className="max-w-2xl text-base leading-[1.8] text-body">{projectsSection.intro}</p>
        </Reveal>
      </Container>

      <div className="mt-16 md:mt-0">
        <ProjectShowcase />
      </div>
    </section>
  )
}
