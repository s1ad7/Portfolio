'use client'

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { projects, type Project } from '@/lib/content'
import manifest from '@/public/projects/manifest.json'

type Dims = { width: number; height: number }
const dimsFor = (slug: string): Dims =>
  (manifest as Record<string, Dims>)[slug] ?? { width: 1280, height: 3840 }

/** Crossfade used when the active project changes. */
const CROSSFADE = { duration: 0.35, ease: [0.44, 0, 0.56, 1] as const }

/**
 * Fraction of each slide held still at its top and again at its bottom, before
 * and after the pan. This is what stops a project appearing mid-page: the
 * crossfade gets time to finish while the incoming site still shows its header,
 * and the outgoing one rests on its footer rather than being yanked away.
 */
const HOLD = 0.18

/**
 * Pinned, scroll-scrubbed project showcase.
 *
 * The outer section is N screens tall, which supplies the scroll distance. An
 * inner sticky panel holds still ("pinning") while that distance is consumed,
 * and scroll position drives the animation directly rather than a timer
 * ("scroll-scrubbing"). Each project occupies one screen of that distance: its
 * full-page screenshot pans down inside a browser frame, so it reads as someone
 * scrolling the real site, then crossfades to the next.
 *
 * The frame spans the full content width on purpose. It previously sat beside
 * the text at 653px, which rendered a 1280px-wide site at 0.51x and put 16px
 * body copy at 8px, below the point where it reads as anything but mush. At the
 * full 1200px the same copy lands around 15px, so a visitor can actually read
 * the work. The project's details move to a bar above the frame to pay for it.
 *
 * Falls back to a plain stacked list under reduced motion or on narrow
 * viewports. Pinning hijacks the scroll, which is what reduced-motion asks you
 * not to do, and five pinned screens on a phone is a tunnel with no way out.
 */
export function ProjectShowcase() {
  const reduced = useReducedMotion()
  const [isNarrow, setIsNarrow] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Render the fallback until the media query has been read, so the server and
  // first client paint agree and hydration does not mismatch.
  if (isNarrow === null || isNarrow || reduced) return <ProjectList />

  return <PinnedShowcase />
}

function PinnedShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const count = projects.length

  /* The frame is measured rather than assumed a fixed aspect, because its
     height is clamped against the viewport. The pan needs real pixels: how tall
     the image renders at the frame's width, minus the frame's own height. */
  const [frame, setFrame] = useState({ w: 0, h: 0 })
  useLayoutEffect(() => {
    const el = frameRef.current
    if (!el) return
    const measure = () => setFrame({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Which project is showing, as discrete state.
   *
   * Opacity is deliberately NOT scroll-scrubbed. framer-motion hands
   * scroll-derived style values to the Web Animations API as a scroll timeline,
   * and that hand-off misread the per-slide keyframe ranges here: inline styles
   * were correct while the composited result was a linear ramp across the whole
   * section, leaving the first project faintly visible over every later slide.
   * Crossfading on state is predictable; the pan stays scrubbed because
   * transforms interpolate correctly. */
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(count - 1, Math.max(0, Math.floor(v * count)))
    setActive((prev) => (prev === i ? prev : i))
  })

  return (
    <div ref={ref} style={{ height: `${count * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-7 overflow-hidden px-6 pt-24 pb-10 md:px-10">
        {/* Meta bar. Each project's details crossfade in place above the frame. */}
        <div className="relative mx-auto h-[8.5rem] w-full max-w-[1200px]">
          {projects.map((project, i) => (
            <SlideMeta
              key={project.slug}
              project={project}
              index={i}
              count={count}
              isActive={i === active}
            />
          ))}
        </div>

        {/* Browser frame at full content width, height clamped to the viewport. */}
        <div
          ref={frameRef}
          className="relative mx-auto h-[min(62svh,600px)] w-full max-w-[1200px] overflow-hidden rounded-panel border border-line/70 bg-white shadow-ramp-lg"
        >
          {projects.map((project, i) => (
            <SlidePreview
              key={project.slug}
              project={project}
              index={i}
              count={count}
              isActive={i === active}
              progress={scrollYProgress}
              frame={frame}
            />
          ))}
        </div>

        <ProgressDots count={count} active={active} />
      </div>
    </div>
  )
}

function SlideMeta({
  project,
  index,
  count,
  isActive,
}: {
  project: Project
  index: number
  count: number
  isActive: boolean
}) {
  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
      transition={CROSSFADE}
      /* Inert while hidden, so keyboard focus and screen readers only ever
         reach the project actually on screen. */
      aria-hidden={!isActive}
      // @ts-expect-error -- `inert` is valid HTML; React types lag behind.
      inert={!isActive ? '' : undefined}
      className="absolute inset-0 flex flex-col justify-end gap-3"
    >
      <div className="flex items-baseline justify-between gap-6">
        <p className="eyebrow">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-ui text-base text-ink transition-colors duration-200 ease-signature hover:text-muted"
        >
          Visit site
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div className="flex items-baseline gap-4">
          <h3 className="text-4xl md:text-5xl">{project.title}</h3>
          <p className="text-base text-muted">{project.category}</p>
        </div>

        <ul className="flex flex-wrap items-center gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-hairline bg-panel px-3 py-1 text-[11px] tracking-[0.03em] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Rendered only when supplied, so an unfilled project simply shows less
          rather than an empty row or placeholder text. */}
      {(project.role || project.outcome) && (
        <p className="text-sm text-body">
          {project.role}
          {project.role && project.outcome && <span className="px-2 text-faint">·</span>}
          {project.outcome && <span className="text-ink">{project.outcome}</span>}
        </p>
      )}
    </motion.div>
  )
}

function SlidePreview({
  project,
  index,
  count,
  isActive,
  progress,
  frame,
}: {
  project: Project
  index: number
  count: number
  isActive: boolean
  progress: MotionValue<number>
  frame: { w: number; h: number }
}) {
  /* Pan distance in real pixels, from the measured frame and the capture's own
     dimensions. Pages here run from 1.65:1 to 4.83:1, so a shared distance
     either stops short of a footer or races past it.

     The two HOLD stops are the brake: without them the pan is already moving
     when a slide becomes active, so the incoming site is scrolled past its own
     header before the crossfade finishes. */
  const dims = dimsFor(project.slug)
  const imageH = frame.w ? (frame.w * dims.height) / dims.width : 0
  const travel = Math.max(0, imageH - frame.h)

  const start = index / count
  const end = (index + 1) / count
  const hold = (end - start) * HOLD
  const panY = useTransform(
    progress,
    [start, start + hold, end - hold, end],
    [0, 0, -travel, -travel]
  )

  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={CROSSFADE}
      aria-hidden={!isActive}
      className="absolute inset-0"
    >
      <BrowserChrome href={project.href} />
      <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden bg-white">
        <motion.div
          style={{ y: panY, height: imageH || '100%' }}
          className="relative w-full"
        >
          <Image
            src={project.image}
            alt={`${project.title} website`}
            fill
            sizes="1200px"
            className="object-fill"
            priority={index === 0}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

/** Minimal browser chrome, so the pan reads as a real site being scrolled. */
function BrowserChrome({ href }: { href: string }) {
  const host = href.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 border-b border-line/70 bg-panel px-4">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </span>
      <span className="mx-auto truncate rounded-full bg-white px-3 py-0.5 text-xs text-faint">
        {host}
      </span>
    </div>
  )
}

/** Position within the set, as a row of dots under the frame. */
function ProgressDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-2" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          animate={{
            width: i === active ? 24 : 6,
            backgroundColor: i === active ? 'var(--color-ink)' : 'var(--color-line)',
          }}
          transition={CROSSFADE}
          className="h-1.5 rounded-full"
        />
      ))}
    </div>
  )
}

/**
 * Fallback for narrow viewports and reduced motion: the same content stacked,
 * each preview showing the top of the site rather than panning.
 */
function ProjectList() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 md:px-10">
      {projects.map((project, i) => (
        <article key={project.slug} className="flex flex-col gap-5">
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-panel border border-line/70 bg-white shadow-ramp transition-shadow duration-300 ease-signature hover:shadow-ramp-hover"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden">
              <BrowserChrome href={project.href} />
              <div className="absolute inset-x-0 bottom-0 top-10">
                <Image
                  src={project.image}
                  alt={`${project.title} website`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                  priority={i === 0}
                />
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-2">
            <p className="eyebrow">
              {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </p>
            <h3 className="text-2xl">{project.title}</h3>
            <p className="text-base text-muted">{project.category}</p>
            <p className="text-base leading-[1.8] text-body">{project.description}</p>

            <ul className="mt-1 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-hairline bg-panel px-3 py-1 text-[11px] tracking-[0.03em] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {(project.role || project.outcome) && (
              <p className="mt-1 text-sm text-body">
                {project.role}
                {project.role && project.outcome && <span className="px-2 text-faint">·</span>}
                {project.outcome && <span className="text-ink">{project.outcome}</span>}
              </p>
            )}

            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 font-ui text-base text-ink transition-colors duration-200 ease-signature hover:text-muted"
            >
              Visit site
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H6M12 4V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
