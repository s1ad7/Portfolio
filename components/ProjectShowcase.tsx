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
import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '@/lib/content'

/**
 * Pinned, scroll-scrubbed project showcase.
 *
 * The outer section is N screens tall, which supplies the scroll distance. An
 * inner sticky panel holds still ("pinning") while that distance is consumed,
 * and scroll position drives the animation directly rather than a timer
 * ("scroll-scrubbing"). Each project occupies one screen of that distance: its
 * full-page screenshot pans upward inside a browser frame, so it reads as
 * someone scrolling the real site, then cross-fades to the next.
 *
 * Falls back to a plain stacked list when the visitor prefers reduced motion or
 * the viewport is narrow. Pinning hijacks the scroll, which is precisely what
 * reduced-motion asks you not to do, and on a phone five pinned screens is a
 * long tunnel with no way out.
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const count = projects.length

  /* Which project is showing, as discrete state.
   *
   * Opacity is deliberately NOT scroll-scrubbed. framer-motion hands
   * scroll-derived style values to the Web Animations API as a scroll timeline,
   * and that hand-off misread the per-slide keyframe ranges here: the inline
   * styles were correct while the composited result was a linear ramp across
   * the whole section, leaving the first project faintly visible over every
   * later slide. Crossfading on state instead is predictable, and the pan below
   * stays scrubbed because transforms interpolate correctly.
   */
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(count - 1, Math.max(0, Math.floor(v * count)))
    setActive((prev) => (prev === i ? prev : i))
  })

  return (
    <div ref={ref} style={{ height: `${count * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-16 px-10">
          {/* Text column. Each project's copy cross-fades in its own range. */}
          <div className="relative min-h-[22rem]">
            {projects.map((project, i) => (
              <SlideText
                key={project.slug}
                project={project}
                index={i}
                count={count}
                isActive={i === active}
              />
            ))}
          </div>

          {/* Preview column: one browser frame, contents swapped per project. */}
          <div className="relative aspect-[16/10] w-full">
            {projects.map((project, i) => (
              <SlidePreview
                key={project.slug}
                project={project}
                index={i}
                count={count}
                isActive={i === active}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <ProgressRail progress={scrollYProgress} count={count} />
      </div>
    </div>
  )
}

/** Crossfade used when the active project changes. */
const CROSSFADE = { duration: 0.45, ease: [0.44, 0, 0.56, 1] as const }

function SlideText({
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
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
      transition={CROSSFADE}
      /* Inert while hidden, so keyboard focus and screen readers only ever
         reach the project actually on screen. */
      aria-hidden={!isActive}
      // @ts-expect-error -- `inert` is valid HTML; React types lag behind.
      inert={!isActive ? '' : undefined}
      className="absolute inset-0 flex flex-col justify-center gap-5"
    >
      <p className="eyebrow">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </p>
      <h3 className="text-4xl md:text-5xl">{project.title}</h3>
      <p className="text-base text-ink">{project.category}</p>
      <p className="max-w-md text-base leading-[1.8] text-body">{project.description}</p>
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-fit items-center gap-2 font-ui text-base text-ink transition-colors duration-200 ease-signature hover:text-muted"
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
    </motion.div>
  )
}

function SlidePreview({
  project,
  index,
  count,
  isActive,
  progress,
}: {
  project: Project
  index: number
  count: number
  isActive: boolean
  progress: MotionValue<number>
}) {
  /* The pan stays scroll-scrubbed: transforms interpolate correctly, and this
     is the effect worth scrubbing. The image is 400% of the frame height, so
     walking to -75% travels from the top of the page to the bottom. */
  const panY = useTransform(progress, [index / count, (index + 1) / count], ['0%', '-75%'])

  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.96 }}
      transition={CROSSFADE}
      aria-hidden={!isActive}
      className="absolute inset-0 overflow-hidden rounded-panel border border-line/70 bg-white shadow-ramp-lg"
    >
      <BrowserChrome href={project.href} />
      <div className="absolute inset-x-0 bottom-0 top-9 overflow-hidden">
        <motion.div style={{ y: panY }} className="relative h-[400%] w-full">
          <Image
            src={project.image}
            alt={`${project.title} website`}
            fill
            sizes="(max-width: 1279px) 100vw, 720px"
            className="object-cover object-top"
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
    <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-line/70 bg-panel px-3">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </span>
      <span className="mx-auto truncate rounded-full bg-white px-3 py-0.5 text-[11px] text-faint">
        {host}
      </span>
    </div>
  )
}

/** Slim rail on the right marking how far through the set you are. */
function ProgressRail({ progress, count }: { progress: MotionValue<number>; count: number }) {
  const scaleY = useTransform(progress, [0, 1], [1 / count, 1])
  return (
    <div className="absolute right-10 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-line xl:block">
      <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-ink" />
    </div>
  )
}

/**
 * Fallback for narrow viewports and reduced motion: the same content as a plain
 * stack, with each preview showing the top of the site rather than panning.
 */
function ProjectList() {
  return (
    <div className="flex flex-col gap-12">
      {projects.map((project, i) => (
        <article key={project.slug} className="flex flex-col gap-5">
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-panel border border-line/70 bg-white shadow-ramp transition-shadow duration-300 ease-signature hover:shadow-ramp-hover"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <BrowserChrome href={project.href} />
              <div className="absolute inset-x-0 bottom-0 top-9">
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
            <p className="text-base text-ink">{project.category}</p>
            <p className="text-base leading-[1.8] text-body">{project.description}</p>
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-2 font-ui text-base text-ink transition-colors duration-200 ease-signature hover:text-muted"
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
