import type { MetadataRoute } from 'next'
import { htmlLang, locales } from '@/lib/i18n'
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

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: { languages },
  }))
}
