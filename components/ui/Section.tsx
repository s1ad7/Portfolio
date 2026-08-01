import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

type SectionProps = {
  /** Anchor target. Must match the nav ids in lib/content.ts. */
  id: string
  /** Label above the heading, without the leading slashes. */
  eyebrow: string
  heading: ReactNode
  intro?: string
  children: ReactNode
  /** Card fill. The reference alternates white and #f2f2f2 down the page. */
  tone?: 'white' | 'panel'
  className?: string
}

/** Shared container: one place defining max width, gutters and vertical rhythm. */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  /* 1280 outer minus 40px gutters gives a 1200px measure, which is exactly the
     content width the reference uses at 1440. */
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>{children}</div>
  )
}

/**
 * Section shell with the reference's header treatment: centred eyebrow, display
 * heading, then an optional intro paragraph at a readable measure. Defining it
 * once keeps all five content sections in exact vertical rhythm.
 */
export function Section({
  id,
  eyebrow,
  heading,
  intro,
  children,
  tone = 'white',
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`shell scroll-mt-28 py-16 md:py-28 lg:py-32 ${
        tone === 'panel' ? 'bg-panel' : 'bg-white'
      } ${className}`}
    >
      <Container>
        {/* Eyebrow and heading stay centred. The intro does NOT below md:
            centring a paragraph that wraps to four or five lines makes the
            reader hunt for the start of each line, which is exactly what
            happens to these at phone width. Short enough to centre on a wide
            screen, so it does from md up. */}
        <Reveal className="flex flex-col gap-4 md:items-center md:text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="max-w-3xl text-4xl md:text-5xl">{heading}</h2>
          {intro && <p className="copy max-w-2xl text-base text-body">{intro}</p>}
        </Reveal>
        <div className="mt-10 md:mt-16 lg:mt-20">{children}</div>
      </Container>
    </section>
  )
}
