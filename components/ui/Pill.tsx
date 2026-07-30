import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'badge' | 'dark' | 'light'

const variants: Record<Variant, string> = {
  /** The hero badge: soft grey fill with a hairline outline, wide-tracked caps. */
  badge:
    'bg-panel-2/70 border border-line/80 text-ink text-[0.8125rem] md:text-base tracking-[0.09em] uppercase px-5 py-2',
  /** The primary call to action: solid near-black capsule. */
  dark: 'bg-ink text-white text-sm font-medium px-6 py-3 hover:bg-ink/85 shadow-ramp',
  /** Secondary capsule on tinted panels. */
  light: 'bg-white text-ink text-sm font-medium px-6 py-3 border border-line hover:bg-panel',
}

type PillProps = {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
}

/**
 * Every capsule on the page: hero badge, nav CTA, skill tags, section CTAs.
 * Renders a Link when given an href and a plain span otherwise, so decorative
 * badges do not end up as bogus interactive elements.
 */
export function Pill({ children, variant = 'badge', href, className = '' }: PillProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full whitespace-nowrap transition-colors duration-200 ease-signature'
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  return <span className={classes}>{children}</span>
}
