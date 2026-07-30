import type { Metadata } from 'next'
import { Bricolage_Grotesque, Poppins } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { site } from '@/lib/content'

/* Two faces, matching the reference's measured usage: Bricolage Grotesque at
   weight 600 for every heading and the hero display, Poppins for everything
   else (body copy, nav, badges, eyebrow labels). */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-bricolage',
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
    <html lang="en">
      <body className={`${bricolage.variable} ${poppins.variable} font-body`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
