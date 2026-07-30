import Link from 'next/link'
import { site } from '@/lib/content'

/**
 * Two-line stacked wordmark, matching the reference exactly: Bricolage
 * Grotesque 24px semibold, 1.1 leading, -0.03em tracking, given name at 70%
 * ink and surname at full ink.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link
      href="#top"
      aria-label={`${site.name}, back to top`}
      className={`font-display text-[1.375rem] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[1.5rem] ${className}`}
    >
      <span className="block text-muted">{site.firstName}</span>
      <span className="block text-ink">{site.lastName}</span>
    </Link>
  )
}
