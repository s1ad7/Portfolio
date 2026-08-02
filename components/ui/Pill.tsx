import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'badge' | 'dark' | 'light' | 'status'

const variants: Record<Variant, string> = {
  /**
   * The hero badge. The reference fills this with a top-to-bottom
   * #f2f2f2 -> #e6e6e6 gradient rather than a flat tint, which is what gives it
   * the slightly recessed look.
   */
  /* max-w-full + wrapping: the badge now carries three segments (role,
     country, reach) and ran past the edge of a 320px screen as one line. */
  /* The badge wraps. It carries three segments (role, country, reach) and as
     one unbreakable line it pushed the hero 160px past a 320px screen.
     Buttons and tags keep nowrap; they are short and should not break. */
  badge:
    'bg-gradient-to-b from-panel to-[#e6e6e6] border border-line/70 text-ink text-[0.8125rem] md:text-base tracking-[0.09em] uppercase px-5 py-2 max-w-full text-balance text-center',
  /**
   * The primary call to action: solid near-black capsule. Bricolage Grotesque
   * 16px semibold with 12px/24px padding, measured off the reference's button.
   */
  dark: 'whitespace-nowrap bg-ink-cta text-white font-display text-base font-semibold px-6 py-3 hover:bg-ink-cta-hover shadow-ramp',
  /** Secondary capsule on tinted panels. */
  light:
    'whitespace-nowrap bg-white text-ink font-display text-base font-semibold px-6 py-3 border border-line hover:bg-panel',
  /** Small status capsule sitting beside the wordmark. */
  status: 'bg-white border border-line text-ink text-sm px-3 py-1.5',
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
  /* No whitespace utility in the base. It used to be `whitespace-nowrap`, and
     a variant could not override it: two utilities from the same group on one
     element resolve by stylesheet order, not class order. Each variant now
     states what it needs. */
  const base = 'inline-flex items-center gap-2 rounded-full transition-colors duration-200 ease-signature'
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
