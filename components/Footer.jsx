"use client"
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="container-pro py-16 sm:py-20">
      <div className="grid gap-10 sm:gap-12 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">SI</div>
          <p className="text-sm text-neutral-300">Full‑stack developer focused on MERN and Odoo/ERP. Thanks for visiting.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-3">
          <div>
            <div className="text-neutral-200 font-medium">General</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li><Link href="#home" className="hover:text-white">Home</Link></li>
              <li><Link href="#about" className="hover:text-white">About</Link></li>
              <li><Link href="#skills" className="hover:text-white">Skills</Link></li>
              <li><Link href="#projects" className="hover:text-white">Projects</Link></li>
              <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-neutral-200 font-medium">More</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li><Link href="#contact" className="hover:text-white">Book a call</Link></li>
              <li><Link href="https://www.linkedin.com/in/saad-ifli/" target="_blank" className="hover:text-white">LinkedIn</Link></li>
              <li><Link href="https://github.com/saadifli" target="_blank" className="hover:text-white">GitHub</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-400">
        <div>© {year} Saad Ifli. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="https://www.linkedin.com/in/saad-ifli/" target="_blank" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">in</Link>
          <Link href="https://github.com/saadifli" target="_blank" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">gh</Link>
        </div>
      </div>
    </footer>
  )
}
