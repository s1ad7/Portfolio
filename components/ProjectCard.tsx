'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ease, useReveal, viewportOnce } from '@/lib/motion'
import type { Project } from '@/lib/content'

/** Arrow that slides on hover, shown only on cards that link somewhere. */
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The reference's two-state card: at rest the image sits calm inside its panel,
 * on hover it scales up inside the fixed frame while the title shifts to the
 * accent colour. Driven by a variant on the wrapper so image and text move
 * together off a single hover target.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { variants, reduced } = useReveal()
  const interactive = Boolean(project.href)

  const inner = (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={reduced ? undefined : 'hover'}
      className="group flex h-full flex-col overflow-hidden rounded-panel border border-line/70 bg-panel transition-shadow duration-300 ease-signature hover:shadow-ramp-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          variants={{ hover: { scale: 1.04 } }}
          transition={{ duration: 0.5, ease }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            /* First two cards are near the fold on most viewports. */
            priority={index < 2}
          />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
        <p className="eyebrow">{project.category}</p>

        <h3 className="flex items-center gap-2 text-xl leading-[1.5] transition-colors duration-200 ease-signature group-hover:text-accent">
          {project.title}
          {interactive && (
            <motion.span
              variants={{ hover: { x: 3, y: -3 } }}
              transition={{ duration: 0.25, ease }}
              className="text-faint group-hover:text-accent"
            >
              <ArrowIcon />
            </motion.span>
          )}
        </h3>

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
