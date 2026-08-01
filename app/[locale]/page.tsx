import { notFound } from 'next/navigation'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { isLocale } from '@/lib/i18n'

/* Section order follows the reference: hero, work, who, what, questions, contact.
   Server components take the locale and read their own copy; client components
   read it from ContentProvider in the layout. */
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects locale={locale} />
        <About locale={locale} />
        <Skills />
        <Faq />
        <Contact />
      </main>
      <Footer locale={locale} />
    </>
  )
}
