import { projects, projectsSection } from '@/lib/content'
import { ProjectCard } from './ProjectCard'
import { Eyebrow } from './ui/Eyebrow'
import { Reveal } from './ui/Reveal'

/**
 * Projects, matching the reference's section (paul-hahn.com).
 *
 * The header is LEFT-aligned here, unlike the other sections which centre
 * theirs. That is how the reference does it: eyebrow, heading and intro all sit
 * flush at the container's left edge.
 *
 * Two containers, not one. The header runs to 1200px while the card grid is
 * 1090px (two 533px cards plus a 24px gap), centred inside it. That inset is
 * measured, not invented.
 */
export function Projects() {
  return (
    <section id="projects" className="shell scroll-mt-28 bg-white py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-0">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>{projectsSection.eyebrow}</Eyebrow>
          <h2 className="max-w-[745px] text-4xl md:text-5xl">{projectsSection.heading}</h2>
          <p className="text-base leading-[1.8] text-muted">{projectsSection.intro}</p>
        </Reveal>

        <div className="mx-auto mt-14 grid w-full max-w-[1090px] gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
