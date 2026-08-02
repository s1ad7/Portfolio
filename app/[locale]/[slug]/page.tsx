import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingPage } from '@/components/landing/LandingPage'
import { CaseStudyPage } from '@/components/work/CaseStudyPage'
import { landingPages, findLandingPage } from '@/lib/landing/pages'
import { caseStudies, findCaseStudy } from '@/lib/work/cases'
import { htmlLang, isLocale, locales } from '@/lib/i18n'
import { site } from '@/lib/site'
import { siteUrl } from '@/lib/site-url'

/* Both content types live at the top level and share this route: the keyword
   belongs in the URL, and burying either under a folder segment dilutes it for
   nothing. Slugs are unique across both sets. */
export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...landingPages.map((page) => ({ locale, slug: page.copy[locale].slug })),
    ...caseStudies.map((study) => ({ locale, slug: study.copy[locale].slug })),
  ])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const page = findLandingPage(locale, slug)
  const study = !page ? findCaseStudy(locale, slug) : undefined
  if (!page && !study) return {}

  const copy = page ? page.copy[locale] : study!.copy[locale]
  const alternateFor = (l: typeof locales[number]) =>
    page ? page.copy[l].slug : study!.copy[l].slug

  /* Each locale has a DIFFERENT slug for the same page, so the alternates have
     to be built from the page rather than by swapping the locale prefix. Get
     this wrong and hreflang points at a 404, which is worse than omitting it. */
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}/${alternateFor(l)}`]))

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/${copy.slug}`, languages },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/${copy.slug}`,
      siteName: site.name,
      locale: htmlLang[locale],
      type: 'website',
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const page = findLandingPage(locale, slug)
  if (page) return <LandingPage page={page} locale={locale} />

  const study = findCaseStudy(locale, slug)
  if (study) return <CaseStudyPage study={study} locale={locale} />

  notFound()
}
