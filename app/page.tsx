import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'

/* Section order follows the reference: hero, work, who, what, questions, contact. */
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
