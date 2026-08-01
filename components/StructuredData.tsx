import { about, faqSection, projects, site, skillsSection } from '@/lib/content'
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
export function StructuredData() {
  const graph = [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: site.name,
      url: siteUrl,
      image: `${siteUrl}/about-portrait.jpg`,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      address: { '@type': 'PostalAddress', addressCountry: 'MA' },
      sameAs: [site.links.github, site.links.linkedin],
      knowsAbout: skillsSection.cards.flatMap((card) => [...card.tags]),
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: `${site.name}, ${site.role}`,
      description: site.description,
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      email: `mailto:${site.email}`,
      founder: { '@id': `${siteUrl}/#person` },
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
      '@id': `${siteUrl}/#faq`,
      mainEntity: faqSection.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#work`,
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
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: `${site.name}, ${site.role}`,
      description: about.paragraphs[0],
      publisher: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en',
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
