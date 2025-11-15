"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 ${scrolled ? 'top-2 sm:top-4' : 'top-5 sm:top-8'} z-50 transition-all`}>
      <nav className="flex justify-center">
        <div className={`glass rounded-full shadow-soft ${scrolled ? 'bg-white/6' : 'bg-white/8'} max-w-[90vw] md:max-w-3xl lg:max-w-4xl w-auto inline-flex overflow-x-auto scrollbar-hide` } aria-label="Primary">
          <div className="flex items-center justify-center gap-1 px-1 sm:px-2 py-2">
            <div className="flex items-center gap-1 sm:gap-2 text-sm">
              {[
                ['Home', '#home'],
                ['About', '#about'],
                ['Skills', '#skills'],
                ['Projects', '#projects']
              ].map(([label, href]) => (
                <Link key={href} href={href} className="btn-ghost px-2.5 py-1.5">
                  {label}
                </Link>
              ))}
            </div>
            <Link href="#contact" className="btn-primary px-3 py-1.5">Book a Call</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}