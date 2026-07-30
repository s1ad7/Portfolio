'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useReveal, viewportOnce } from '@/lib/motion'
import type { Project } from '@/lib/content'

/**
 * Project card.
 *
 * The hover state is deliberately just a deepening shadow. That is all the
 * reference does: provoking its card hover and diffing computed styles showed
 * the shadow alpha going 0.07 -> 0.25 with no transform, no image scale and no
 * title recolour. This previously scaled the image, recoloured the title to the
 * accent and slid an arrow, none of which the reference does.
 *
 * See docs/reference-spec.md, "Hover states".
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { variants } = useReveal()
  const interactive = Boolean(project.href)

  const inner = (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex h-full flex-col overflow-hidden rounded-panel border border-line/70 bg-white shadow-ramp transition-shadow duration-300 ease-signature hover:shadow-ramp-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          /* First two cards are near the fold on most viewports. */
          priority={index < 2}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
        {/* Poppins 16/400 at full ink on the reference, not the accent-blue
            eyebrow treatment the section headers use. */}
        <p className="text-base text-ink">{project.category}</p>
        <h3 className="text-xl leading-[1.5]">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </motion.div>
  )

  if (!interactive) return inner

  return (
    <Link
      href={project.href as string}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded-panel"
      aria-label={`${project.title}, opens in a new tab`}
    >
      {inner}
    </Link>
  )
}
