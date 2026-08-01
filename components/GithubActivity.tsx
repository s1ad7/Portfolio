'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'
import { format } from '@/lib/content'
import { site } from '@/lib/site'
import { useContent } from './ContentProvider'

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
type ApiResponse = { total: Record<string, number>; contributions: Day[] }

/** Username comes from the one place the profile URL already lives. */
const USERNAME = site.links.github.replace(/\/+$/, '').split('/').pop() ?? ''

/**
 * The activity scale, on the site's own palette. GitHub's greens would be the
 * only green on an otherwise blue-accented page, so levels run through the
 * accent instead.
 */
const LEVELS = [
  'rgb(25 29 33 / 0.06)',
  'rgb(77 128 209 / 0.25)',
  'rgb(77 128 209 / 0.45)',
  'rgb(77 128 209 / 0.7)',
  'rgb(77 128 209 / 1)',
]

/**
 * GitHub contribution calendar, fetched live and drawn in the site's palette.
 *
 * Live rather than baked in at build time because the whole point is
 * consistency: a static site rebuilt monthly would show a graph frozen at its
 * last deploy, which reads as inactivity, the opposite of the signal.
 *
 * Data comes from the public jogruber contributions API (the same source the
 * common React calendar components use), since GitHub's own GraphQL endpoint
 * needs an authenticated token that has no place in client code. If the fetch
 * fails, or the username has no data, the component renders NOTHING: a missing
 * band is invisible, a broken one is a trust hole in a section built on proof.
 */
export function GithubActivity() {
  const scope = useRef<HTMLDivElement>(null)
  const { content } = useContent()
  const copy = content.about.github
  const [days, setDays] = useState<Day[] | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!USERNAME) return
    const controller = new AbortController()

    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? (r.json() as Promise<ApiResponse>) : Promise.reject(r.status)))
      .then((data) => {
        if (!data.contributions?.length) return
        setDays(data.contributions)
        setTotal(data.total?.lastYear ?? data.contributions.reduce((n, d) => n + d.count, 0))
      })
      .catch(() => {
        /* Render nothing; see above. */
      })

    return () => controller.abort()
  }, [])

  useGSAP(
    () => {
      if (!days || prefersReducedMotion()) return
      gsap.from('[data-week]', {
        opacity: 0,
        y: 6,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.012,
        scrollTrigger: { trigger: scope.current, start: 'top 90%', once: true },
      })
    },
    { scope, dependencies: [days !== null] }
  )

  if (!days) return null

  /* Chunk into GitHub's Sunday-first columns. The range rarely starts on a
     Sunday, so the first column is padded with empty leading cells. */
  const offset = new Date(days[0].date).getDay()
  const padded: (Day | null)[] = [...Array<null>(offset).fill(null), ...days]
  const weeks: (Day | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7))

  return (
    <div ref={scope} className="mt-10 flex flex-col gap-4 md:mt-14">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-base text-ink">
          <span className="font-display text-xl">{total.toLocaleString('en-US')}</span>{' '}
          <span className="text-muted">{copy.contributions}</span>
        </p>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          /* -my-3 cancels the padding: the hit area reaches 44px without shifting
             the baseline alignment with the total on the left. */
          className="-my-3 py-3 font-ui text-sm text-ink transition-colors duration-200 ease-signature hover:text-muted"
        >
          @{USERNAME} &#8599;
        </a>
      </div>

      <div
        role="img"
        aria-label={format(copy.calendarLabel, { total })}
        className="flex gap-[3px] overflow-hidden"
      >
        {weeks.map((week, w) => (
          <div key={w} data-week className="flex min-w-0 flex-1 flex-col gap-[3px]">
            {week.map((day, d) =>
              day ? (
                <div
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  className="aspect-square w-full rounded-[2px]"
                  style={{ backgroundColor: LEVELS[day.level] }}
                />
              ) : (
                <div key={`pad-${d}`} className="aspect-square w-full" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
