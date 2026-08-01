import type { Metadata } from 'next'
import { Bricolage_Grotesque, Poppins, Work_Sans } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { site } from '@/lib/content'

/* Two faces, matching the reference's measured usage: Bricolage Grotesque at
   weight 600 for every heading and the hero display, Poppins for everything
   else (body copy, nav, badges, eyebrow labels). */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  /* The About headline computes to w900 on the reference, but Google Fonts
     caps Bricolage Grotesque at 800, so 800 is the heaviest real weight
     available. The difference is imperceptible at 32px. */
  weight: ['600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

/* The reference sets nav links in Work Sans 16/400, which is why it loads a
   third family. */
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-work-sans',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${site.name}, ${site.role}`,
  description: site.description,
  openGraph: {
    title: `${site.name}, ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* The font variables must land on <html>, not <body>. Tailwind emits the
       @theme tokens (--font-display, --font-body) onto :root, and those tokens
       reference these variables. Defined only on <body>, they are undefined at
       :root, which makes the whole token invalid and silently drops every
       heading and paragraph back to the default system sans. */
    <html lang="en" className={`${bricolage.variable} ${poppins.variable} ${workSans.variable}`}>
      {/* suppressHydrationWarning is scoped to <body> on purpose. Extensions in
          the Bitdefender family inject attributes (`bis_register`,
          `__processed_<uuid>__`) into <body> before React hydrates, which React
          reports as a mismatch even though the app rendered correctly. It is
          set here and nowhere else, so a genuine mismatch anywhere inside the
          tree is still reported. */}
      <body className="font-body" suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
