import Link from 'next/link'
import { site } from '@/lib/content'

/**
 * Footer, matching the reference's: a centred wordmark and the tagline, and
 * nothing else. No link columns, no copyright row; the social links live in the
 * contact card directly above, so repeating them here was noise. The tagline
 * deliberately echoes the Projects heading, which is exactly what the
 * reference does with its own.
 */
export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <Link
        href="#top"
        aria-label={`${site.name}, back to top`}
        className="font-display text-2xl font-semibold tracking-[-0.03em]"
      >
        <span className="text-wordmark">{site.firstName}</span>{' '}
        <span className="text-ink">{site.lastName}</span>
      </Link>
      <p className="text-sm text-ink">{site.tagline}</p>
    </footer>
  )
}
