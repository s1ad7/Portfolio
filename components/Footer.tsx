import Link from 'next/link'
import { getContent } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { site } from '@/lib/site'

/**
 * Footer, matching the reference's: a centred wordmark and the tagline, and
 * nothing else. No link columns, no copyright row; the social links live in the
 * contact card directly above, so repeating them here was noise. The tagline
 * deliberately echoes the Projects heading, which is exactly what the
 * reference does with its own.
 */
export function Footer({ locale }: { locale: Locale }) {
  const content = getContent(locale)

  return (
    <footer className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <Link
        href={`/${locale}#top`}
        className="-my-2 py-2 font-display text-2xl font-semibold tracking-[-0.03em]"
      >
        <span className="text-wordmark">{site.firstName}</span>{' '}
        <span className="text-ink">{site.lastName}</span>
        <span className="sr-only">{content.backToTop}</span>
      </Link>
      <p className="text-sm text-ink">{content.tagline}</p>
    </footer>
  )
}
