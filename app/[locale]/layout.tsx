import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Bricolage_Grotesque, Poppins, Work_Sans } from 'next/font/google'
import '../globals.css'
import { ContentProvider } from '@/components/ContentProvider'
import { SmoothScroll } from '@/components/SmoothScroll'
import { StructuredData } from '@/components/StructuredData'
import { getContent } from '@/lib/content'
import { htmlLang, isLocale, locales } from '@/lib/i18n'
import { site } from '@/lib/site'
import { siteUrl } from '@/lib/site-url'

/* Two faces, matching the reference's measured usage: Bricolage Grotesque at
   weight 600 for every heading and the hero display, Poppins for everything
   else (body copy, nav, badges, eyebrow labels). */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  /* The About headline computes to w900 on the reference, but Google Fonts
     caps Bricolage Grotesque at 800, so 800 is the heaviest real weight
     available. The difference is imperceptible at 32px. */
  weight: ['600', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

/* The reference sets nav links in Work Sans 16/400, which is why it loads a
   third family. */
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-work-sans',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

/** Both locales are prerendered, so each is a static file with no runtime cost. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { meta } = getContent(locale)

  /**
   * hreflang. Every locale lists every alternate, and x-default points at
   * English. Without this, Google reads the two pages as competing duplicates
   * rather than translations of one another.
   */
  const languages = Object.fromEntries([
    ...locales.map((l) => [htmlLang[l], `/${l}`]),
    ['x-default', '/en'],
  ])

  return {
    /* Resolved from the environment, not hardcoded: absolute URLs must point at
       a host that actually answers, or social cards fetch a dead origin and
       render broken. See lib/site-url.ts. */
    metadataBase: new URL(siteUrl),
    title: { default: meta.title, template: `%s | ${site.name}` },
    description: meta.description,
    keywords: [...meta.keywords, site.name],
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    alternates: { canonical: `/${locale}`, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/${locale}`,
      siteName: site.name,
      locale: htmlLang[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

/* Matches the page background, so mobile browsers tint their chrome to suit. */
export const viewport: Viewport = { themeColor: '#ffffff' }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const content = getContent(locale)

  return (
    /* The font variables must land on <html>, not <body>. Tailwind emits the
       @theme tokens (--font-display, --font-body) onto :root, and those tokens
       reference these variables. Defined only on <body>, they are undefined at
       :root, which makes the whole token invalid and silently drops every
       heading and paragraph back to the default system sans. */
    <html
      lang={htmlLang[locale]}
      className={`${bricolage.variable} ${poppins.variable} ${workSans.variable}`}
    >
      {/* suppressHydrationWarning is scoped to <body> on purpose. Extensions in
          the Bitdefender family inject attributes (`bis_register`,
          `__processed_<uuid>__`) into <body> before React hydrates, which React
          reports as a mismatch even though the app rendered correctly. It is
          set here and nowhere else, so a genuine mismatch anywhere inside the
          tree is still reported. */}
      <body className="font-body" suppressHydrationWarning>
        <ContentProvider content={content} locale={locale}>
          <SmoothScroll />
          <StructuredData locale={locale} />
          {children}
        </ContentProvider>
      </body>
    </html>
  )
}
