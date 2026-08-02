'use client'

import Image from 'next/image'
import { useCallback, useId, useRef, useState } from 'react'
import { useContent } from '@/components/ContentProvider'

type Props = {
  before: string
  after: string
  beforeLabel: string
  afterLabel: string
  /** Describes the pair for anyone who cannot see it. */
  alt: string
}

/**
 * Before and after comparison.
 *
 * Built on a real range input rather than a div with pointer handlers. That
 * single decision buys keyboard control, screen reader semantics, the correct
 * ARIA role and value announcements, and touch dragging, all for free and all
 * correct. Hand-rolled sliders reliably miss at least three of those.
 *
 * The input sits invisible on top of the images and drives a clip on the
 * "after" layer. Nothing animates on load: this is a control, and a control
 * that moves on its own is a control fighting the user.
 */
export function BeforeAfter({ before, after, beforeLabel, afterLabel, alt }: Props) {
  const { content } = useContent()
  const copy = content.work.compare

  const [position, setPosition] = useState(50)
  const frame = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, '')

  const onInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(event.target.value))
  }, [])

  return (
    <figure className="flex flex-col gap-3">
      <div
        ref={frame}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-panel bg-panel shadow-ramp select-none"
      >
        {/* The NEW site underneath, so it occupies whatever the handle has not
            covered: everything to the right of the seam. */}
        <Image
          src={after}
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 1090px"
          className="object-cover object-top"
        />

        {/* The OLD design on top, clipped to the left of the seam.
            Before on the left and after on the right is the convention every
            visitor already knows, and the labels in the corners have to agree
            with it: clipping the other layer put the new site under the
            "Before" label.
            clip-path rather than width: the image keeps its natural size, so
            nothing squashes as the handle travels. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={before}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 1090px"
            className="object-cover object-top"
          />
        </div>

        {/* The seam. Purely decorative; the input below is the real control. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.12)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-ramp-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
              <path d="m9 6-5 6 5 6M15 6l5 6-5 6" />
            </svg>
          </span>
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium tracking-[0.06em] text-white uppercase backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium tracking-[0.06em] text-white uppercase backdrop-blur-sm">
          {afterLabel}
        </span>

        {/* The control itself: invisible, full-bleed, and genuinely a slider.
            Arrow keys, Home and End all work because the browser provides
            them. */}
        <label htmlFor={id} className="sr-only">
          {copy.label}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={onInput}
          aria-valuetext={`${position}% ${beforeLabel}`}
          className="compare-range absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline-none"
        />
      </div>

      <figcaption className="text-sm text-muted">
        {alt} <span className="text-faint">{copy.hint}</span>
      </figcaption>
    </figure>
  )
}
