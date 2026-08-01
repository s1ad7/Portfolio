import type { MetadataRoute } from 'next'
import { htmlLang, locales } from '@/lib/i18n'
import { landingPages } from '@/lib/landing/pages'
import { siteUrl } from '@/lib/site-url'

/**
 * One entry per locale, each declaring the others as alternates.
 *
 * `alternates.languages` is the sitemap half of hreflang: it tells Google the
 * two URLs are translations rather than duplicates, which is what stops them
 * competing with each other in search results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], `${siteUrl}/${l}`]))

  const home = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: { languages },
  }))

  /* Each locale uses a different, keyword-bearing slug for the same page, so
     the alternates are built from the page rather than by swapping the prefix.
     Swapping would point hreflang at a 404. */
  const landing = locales.flatMap((locale) =>
    landingPages.map((page) => ({
      url: `${siteUrl}/${locale}/${page.copy[locale].slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [htmlLang[l], `${siteUrl}/${l}/${page.copy[l].slug}`])
        ),
      },
    }))
  )

  return [...home, ...landing]
}
