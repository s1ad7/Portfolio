import { projects, projectsSection } from '@/lib/content'
import { ProjectCard } from './ProjectCard'
import { Section } from './ui/Section'

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow={projectsSection.eyebrow}
      heading={projectsSection.heading}
      intro={projectsSection.intro}
    >
      {/* Two columns from md up. An odd final card simply spans one column and
          sits left, which keeps the grid honest at any project count. */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
