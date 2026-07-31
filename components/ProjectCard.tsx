'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP, DURATION, EASE } from '@/lib/gsap'
import type { Project } from '@/lib/content'

/**
 * Project card, built to the reference's measurements (paul-hahn.com), taken
 * from the running site at a 1440 viewport:
 *
 *   card     533x622, white, 24px radius, three-stop shadow ramp
 *   image    533x400, flush to the card's top edge, object-cover
 *   padding  24px on the content below the image
 *   pill     #e8e8e8, full radius, 38px tall, 12px inset
 *   gaps     image -> pill 16, pill -> title 12, title -> body 8
 *
 * Hover deepens the shadow and does nothing else. That was verified by
 * provoking the reference's own hover and diffing computed styles: no lift, no
 * image scale, no colour change.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const scope = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const el = scope.current
      if (!el) return
      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, y: 0 })
        return
      }
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: DURATION,
        ease: EASE,
        // Cards in the same row arrive together, the next row follows.
        delay: (index % 2) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    },
    { scope, dependencies: [index] }
  )

  return (
    <Link
      ref={scope}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title}. Opens the live site in a new tab.`}
      className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-ramp transition-shadow duration-300 ease-signature hover:shadow-ramp-hover"
    >
      <div className="relative aspect-[533/400] w-full shrink-0">
        <Image
          src={project.image}
          alt={`Thumbnail for ${project.title}`}
          fill
          sizes="(max-width: 767px) 100vw, 533px"
          className="object-cover"
          priority={index < 2}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 w-fit rounded-full bg-panel-2 px-3 py-1.5 text-base leading-[1.6] text-ink">
          {project.category}
        </span>
        <h3 className="mb-2 text-xl leading-[1.5]">{project.title}</h3>
        <p className="text-base leading-[1.6] text-muted">{project.description}</p>
      </div>
    </Link>
  )
}
