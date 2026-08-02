import Link from 'next/link'
import { getContent } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { cityPages, offerPages } from '@/lib/landing/pages'
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

      {/* Every city page linked from every page. Crawlers reach pages through
          links, and a page nothing links to neither gets crawled reliably nor
          receives any of the site's authority. */}
      {/* Reach stated before the city list. Three Moroccan cities under a
          heading like "areas served" reads to a client abroad as the boundary
          of where he works, which is the opposite of true. */}
      <p className="label-caps mt-4">{content.worldwide}</p>

      {/* The list is unlabelled on screen: "Remote, worldwide" above it
          already sets the context, and a second heading made the row look like
          a restriction. aria-label keeps it named for screen readers. */}
      <nav aria-label={content.areasServed} className="mt-3 flex flex-wrap items-center justify-center">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {cityPages.map((page) => (
            <li key={page.id}>
              <Link
                href={`/${locale}/${page.copy[locale].slug}`}
                className="-my-2 block py-2 font-ui text-sm text-muted transition-colors duration-200 ease-signature hover:text-ink"
              >
                {page.city}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* The lead magnet, given its own line: it is an offer, not a place, and
          it is the lowest-commitment way for a stranger to start a
          conversation. */}
      {offerPages.map((page) => (
        <Link
          key={page.id}
          href={`/${locale}/${page.copy[locale].slug}`}
          className="mt-2 font-ui text-sm text-accent-text underline-offset-4 hover:underline"
        >
          {page.copy[locale].eyebrow}
        </Link>
      ))}
    </footer>
  )
}
