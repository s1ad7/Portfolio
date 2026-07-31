'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { projects, type Project } from '@/lib/content'
import { gsap, prefersReducedMotion, SplitText, useGSAP } from '@/lib/gsap'

/**
 * Pinned full-bleed project showcase.
 *
 * Each project owns one screen of scroll. Its hero fills the panel behind a
 * gradient scrim, with the narrative in front: who it was for, when it shipped,
 * the title, the story, and the stack. The whole panel links to the live site.
 *
 * Using the hero as a *background* rather than a readable page is the point.
 * Earlier versions tried to show whole sites inside a frame and lost: a page
 * scaled to fit is unreadable at any frame size that fits on screen. A scrimmed
 * hero is impressionistic on purpose, and the reading is done by the copy in
 * front of it, which is also where the argument for the work actually lives.
 *
 * Below `lg`, and under reduced motion, this degrades to a plain stack. Pinning
 * hijacks the scroll, which is what reduced motion asks you not to do, and six
 * pinned screens on a phone is a tunnel with no way out.
 */
export function ProjectShowcase() {
  const root = useRef<HTMLDivElement>(null)
  const count = projects.length

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (!window.matchMedia('(min-width: 1024px)').matches) return

      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
      if (panels.length < 2) return

      // Stack them: the first is visible, the rest wait their turn.
      gsap.set(panels, { opacity: 0 })
      gsap.set(panels[0], { opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${(count - 1) * window.innerHeight}`,
          pin: '[data-pin]',
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      /* One unit of timeline per project, with the crossfade in the middle of
         each. The hold either side is what keeps a project legible for most of
         its screen rather than permanently mid-transition. */
      panels.forEach((panel, i) => {
        if (i === 0) return
        tl.to(panels[i - 1], { opacity: 0, duration: 0.3, ease: 'none' }, i - 1 + 0.35)
        tl.to(panel, { opacity: 1, duration: 0.3, ease: 'none' }, i - 1 + 0.35)
      })

      /* Slow drift on the heroes. Deliberately subtle: the reference site has no
         parallax at all, and a background visibly racing the scroll reads as a
         template rather than as craft. */
      panels.forEach((panel) => {
        const hero = panel.querySelector('[data-hero]')
        if (!hero) return
        gsap.fromTo(
          hero,
          { scale: 1.03, yPercent: -1 },
          {
            scale: 1,
            yPercent: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${count * window.innerHeight}`,
              scrub: true,
            },
          }
        )
      })

      /* Character-level title reveal on the first panel. The others are already
         composed by the time they crossfade in, so splitting them would fire
         against an element nobody can see.

         SplitText keeps the original string exposed to assistive tech rather
         than leaving a pile of single-character spans, which is the usual cost
         of this effect. */
      const firstTitle = panels[0].querySelector<HTMLElement>('[data-title]')
      if (!firstTitle) return

      const split = SplitText.create(firstTitle, {
        type: 'chars',
        charsClass: 'inline-block',
        onSplit: (self) =>
          gsap.from(self.chars, {
            opacity: 0,
            yPercent: 60,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.025,
            scrollTrigger: { trigger: panels[0], start: 'top 70%', once: true },
          }),
      })
      return () => split.revert()
    },
    { scope: root, dependencies: [count] }
  )

  return (
    <div ref={root} className="relative">
      {/* `motion-safe` matters as much as the breakpoint here. The GSAP setup
          bails out under reduced motion, but if the CSS still positioned the
          panels absolutely they would all sit on top of each other, visible at
          once. Gating on motion-safe means reduced motion gets the natural
          stack at every width. */}
      <div data-pin className="relative motion-safe:lg:h-svh motion-safe:lg:overflow-hidden">
        {projects.map((project, i) => (
          <Panel key={project.slug} project={project} index={i} count={count} first={i === 0} />
        ))}
      </div>
    </div>
  )
}

function Panel({
  project,
  index,
  count,
  first,
}: {
  project: Project
  index: number
  count: number
  first: boolean
}) {
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-panel
      aria-label={`${project.title}, ${project.category}. Opens the live site in a new tab.`}
      className="group relative mt-4 block overflow-hidden bg-ink first:mt-0 motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:mt-0 motion-safe:lg:h-full"
    >
      {/* Split rather than overlaid.
       *
       * Every one of these heroes carries its own display headline, so text laid
       * over them was two typefaces fighting in one space, and it would happen
       * on all six because that is what a hero is for. Giving the narrative a
       * solid column of its own removes the competition entirely, and the
       * screenshot stays sharp and uncropped so the work is still visible. */}
      <div className="grid h-full lg:grid-cols-[38fr_62fr]">
        <div className="order-2 flex items-center bg-ink px-8 py-12 lg:order-1 lg:px-14 lg:py-0">
          <div className="flex w-full flex-col gap-5 text-white">
            <p className="flex flex-wrap items-center gap-3 text-sm tracking-[0.14em] text-white/60 uppercase">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="h-px w-8 bg-white/30" aria-hidden="true" />
              <span>{project.year}</span>
              <span className="h-px w-8 bg-white/30" aria-hidden="true" />
              <span>{project.client}</span>
            </p>

            <h3 data-title className="text-4xl leading-[1.05] md:text-5xl xl:text-6xl">
              {project.title}
            </h3>

            <p className="text-lg text-white/85">{project.category}</p>
            <p className="text-base leading-[1.8] text-white/70">{project.story}</p>

            <ul className="flex flex-wrap gap-2 pt-1">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/25 px-3 py-1 text-xs tracking-[0.03em] text-white/75"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <span className="mt-3 inline-flex items-center gap-2 font-ui text-base text-white">
              <span className="border-b border-white/40 pb-0.5 transition-colors duration-300 group-hover:border-white">
                View live site
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path
                  d="M4 12L12 4M12 4H6M12 4V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Screenshot side. `object-left-top` rather than centred: this column is
            taller than the capture's aspect, so something has to be cropped, and
            the left is where a site's logo, navigation and headline live. */}
        <div className="relative order-1 h-64 overflow-hidden sm:h-80 lg:order-2 lg:h-full">
          <div data-hero className="absolute inset-0 will-change-transform">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 62vw"
              className="object-cover object-left-top"
              priority={first}
            />
          </div>
          {/* Softens the seam so the screenshot meets the ink column rather than
              butting against it. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent"
          />
        </div>
      </div>

      <p className="absolute right-6 bottom-6 text-sm text-white/50 lg:right-10 lg:bottom-8">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </p>
    </Link>
  )
}
