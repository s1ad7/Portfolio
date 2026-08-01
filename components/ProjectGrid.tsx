'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import type { Project } from '@/lib/content'
import { ProjectCard } from './ProjectCard'
import { Pill } from './ui/Pill'

/** Cards shown before the first "load more", and how many each press adds. */
const INITIAL = 4
const STEP = 4

/**
 * The card grid, revealing four at a time.
 *
 * Seven cards in one run made the section far taller than anything around it,
 * which is a problem the reference never has because it only shows four.
 * Loading in batches keeps the section proportionate while leaving everything
 * reachable.
 */
export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  const [count, setCount] = useState(INITIAL)
  const gridRef = useRef<HTMLDivElement>(null)
  const previous = useRef(INITIAL)

  const visible = projects.slice(0, count)
  const remaining = projects.length - count

  useEffect(() => {
    if (count <= previous.current) {
      previous.current = count
      return
    }

    /* Move focus to the first newly revealed card. Without this a keyboard user
       presses the button and their position is unchanged, with no indication
       anything happened; the new cards are appended somewhere below them. */
    const cards = gridRef.current?.querySelectorAll<HTMLAnchorElement>('a')
    cards?.[previous.current]?.focus({ preventScroll: false })

    /* The page just got taller, so every trigger below this point is measuring
       against stale positions. */
    ScrollTrigger.refresh()

    previous.current = count
  }, [count])

  return (
    <>
      <div
        ref={gridRef}
        className="mx-auto mt-14 grid w-full max-w-[1090px] gap-6 md:grid-cols-2"
      >
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => Math.min(c + STEP, projects.length))}
            className="rounded-full bg-ink-cta px-6 py-3 font-display text-base font-semibold text-white shadow-ramp transition-colors duration-200 ease-signature hover:bg-ink-cta-hover"
          >
            Load more
          </button>
        </div>
      )}

      {/* Announced to screen readers on change, so the count is not something
          you can only discover by looking. */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects.
      </p>
    </>
  )
}
