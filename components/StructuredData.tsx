import { getContent, getProjectCards } from '@/lib/content'
import { htmlLang, locales, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'
import { siteUrl } from '@/lib/site-url'

/**
 * JSON-LD for search engines.
 *
 * Three graphs, each doing a specific job for the goal of "someone who wants a
 * website built finds this site":
 *
 *   Person            ties the name, the photo and the profiles together so
 *                     Google can resolve "Saad Ifli" as an entity.
 *   ProfessionalService  states what is actually sold, to whom, and where. This
 *                     is the one that matters for "web developer Morocco"
 *                     style queries; areaServed is worldwide because that is
 *                     how Saad works.
 *   FAQPage           makes the six answers eligible to appear as expandable
 *                     rich results directly under the search listing. It must
 *                     mirror the on-page copy exactly, which is why it is
 *                     generated from the same content module rather than
 *                     hand-written.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const content = getContent(locale)
  const { about, faqSection, skillsSection, meta } = content
  const projects = getProjectCards(content)
  /* Per-locale ids, so the two language versions are distinct entities rather
     than one entity described twice with conflicting text. */
  const base = `${siteUrl}/${locale}`

  const graph = [
    {
      '@type': 'Person',
      '@id': `${base}/#person`,
      name: site.name,
      url: base,
      image: `${siteUrl}/about-portrait.jpg`,
      jobTitle: meta.role,
      email: `mailto:${site.email}`,
      address: { '@type': 'PostalAddress', addressCountry: 'MA' },
      sameAs: [site.links.github, site.links.linkedin],
      knowsAbout: skillsSection.cards.flatMap((card) => [...card.tags]),
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${base}/#service`,
      name: meta.title,
      description: meta.description,
      url: base,
      image: `${base}/opengraph-image`,
      email: `mailto:${site.email}`,
      founder: { '@id': `${base}/#person` },
      areaServed: 'Worldwide',
      address: { '@type': 'PostalAddress', addressCountry: 'MA' },
      priceRange: '$$',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: skillsSection.cards.map((card) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: card.title, description: card.body },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${base}/#faq`,
      mainEntity: faqSection.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${base}/#work`,
      name: 'Selected work',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebSite',
          name: project.title,
          url: project.href,
          description: project.description,
        },
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: base,
      name: meta.title,
      description: about.paragraphs[0],
      publisher: { '@id': `${base}/#person` },
      inLanguage: htmlLang[locale],
      /* Declares the sibling translation, matching the hreflang tags. */
      workTranslation: locales
        .filter((l) => l !== locale)
        .map((l) => ({ '@type': 'WebSite', '@id': `${siteUrl}/${l}/#website`, inLanguage: htmlLang[l] })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      /* Serialised with a replacer that strips the one character able to break
         out of a script element. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
          /</g,
          '\\u003c'
        ),
      }}
    />
  )
}
