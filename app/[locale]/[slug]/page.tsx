import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingPage } from '@/components/landing/LandingPage'
import { landingPages, findLandingPage } from '@/lib/landing/pages'
import { htmlLang, isLocale, locales } from '@/lib/i18n'
import { site } from '@/lib/site'
import { siteUrl } from '@/lib/site-url'

/**
 * Local landing pages, one static file per city per locale.
 *
 * These sit at the top level (/fr/creation-site-web-casablanca) rather than
 * under a folder. The URL is a real ranking signal for this kind of page, and
 * burying the keyword under /services/ dilutes it for nothing.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    landingPages.map((page) => ({ locale, slug: page.copy[locale].slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const page = findLandingPage(locale, slug)
  if (!page) return {}

  const copy = page.copy[locale]

  /* Each locale has a DIFFERENT slug for the same page, so the alternates have
     to be built from the page rather than by swapping the locale prefix. Get
     this wrong and hreflang points at a 404, which is worse than omitting it. */
  const languages = Object.fromEntries(
    locales.map((l) => [htmlLang[l], `/${l}/${page.copy[l].slug}`])
  )

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
  if (!page) notFound()

  return <LandingPage page={page} locale={locale} />
}
