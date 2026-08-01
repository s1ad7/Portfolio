'use client'

import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { about, projects, type AboutStat } from '@/lib/content'

/**
 * Resolves a stat's value. 'projects' and 'industries' are derived from the
 * projects list so they can never drift from what the grid above shows; a
 * number is taken as-is.
 */
function resolve(value: AboutStat['value']): number {
  if (value === 'projects') return projects.length
  if (value === 'industries') return new Set(projects.map((p) => p.category)).size
  return value
}

/**
 * The proof band: three figures that count up as they enter the viewport.
 *
 * The final value is server-rendered into the markup, and the animation runs
 * FROM zero after mount. Done the other way round, with zeros in the HTML,
 * anyone without JavaScript (including search engines) would read a row of
 * zeros, and a failed hydration would leave the section claiming nothing.
 */
export function StatBand() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const nums = gsap.utils.toArray<HTMLElement>('[data-count]')

      for (const el of nums) {
        const target = Number(el.dataset.count)
        const proxy = { n: target }
        gsap.fromTo(
          proxy,
          { n: 0 },
          {
            n: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(proxy.n))
            },
          }
        )
      }
    },
    { scope }
  )

  return (
    <div
      ref={scope}
      className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-10 sm:grid-cols-3"
    >
      {about.stats.map((stat) => {
        const value = resolve(stat.value)
        return (
          <div key={stat.label} className="flex flex-col gap-1">
            <p className="text-6xl text-ink md:text-7xl">
              <span data-count={value}>{value}</span>
              {stat.suffix}
            </p>
            <p className="text-base leading-snug text-muted">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
