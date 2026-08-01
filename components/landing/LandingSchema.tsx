import { getContent } from '@/lib/content'
import { htmlLang, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'
import { siteUrl } from '@/lib/site-url'
import type { LandingPage } from '@/lib/landing/pages'

/**
 * Structured data for a local landing page.
 *
 * Three jobs:
 *   Service       states what is sold and, crucially, WHERE. areaServed is the
 *                 field that connects this page to "in Casablanca" queries.
 *   FAQPage       makes the city-specific answers eligible for the expandable
 *                 results that appear directly under a listing.
 *   BreadcrumbList tells Google this page belongs under the site rather than
 *                 floating on its own, which is how link authority flows to it.
 */
export function LandingSchema({ page, locale }: { page: LandingPage; locale: Locale }) {
  const copy = page.copy[locale]
  const { meta } = getContent(locale)
  const url = `${siteUrl}/${locale}/${copy.slug}`

  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: copy.h1,
      description: copy.description,
      serviceType: meta.role,
      url,
      provider: { '@id': `${siteUrl}/${locale}/#person` },
      areaServed: [
        { '@type': 'City', name: page.city },
        { '@type': 'AdministrativeArea', name: page.region },
      ],
      availableLanguage: ['fr', 'en'],
      inLanguage: htmlLang[locale],
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: copy.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: site.name, item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: copy.h1, item: url },
      ],
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
          /</g,
          '\\u003c'
        ),
      }}
    />
  )
}
