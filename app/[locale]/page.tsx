import { notFound } from 'next/navigation'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Process } from '@/components/Process'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Testimonials } from '@/components/Testimonials'
import { StructuredData } from '@/components/StructuredData'
import { isLocale } from '@/lib/i18n'

/* Section order follows the reference: hero, work, who, what, questions, contact.
   Server components take the locale and read their own copy; client components
   read it from ContentProvider in the layout. */
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      {/* Homepage only. Its FAQPage describes the FAQ on THIS page, and a
          landing page carrying it as well would put two conflicting FAQPage
          entities on one URL. Landing pages emit their own. */}
      <StructuredData locale={locale} />
      <Navbar />
      <main>
        <Hero />
        <Projects locale={locale} />
        <About locale={locale} />
        <Skills />
        <Process />
        <Faq />
        <Testimonials locale={locale} />
        <Contact />
      </main>
      <Footer locale={locale} />
    </>
  )
}
