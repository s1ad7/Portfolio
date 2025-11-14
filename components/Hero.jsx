"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import figure from '../Figure.jpg'

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 400], [0, -50])
  const y2 = useTransform(scrollY, [0, 400], [0, -80])

  return (
    <section id="home" className="section-hero pt-28 relative">
      <motion.div style={{ y: y1 }} className="absolute -top-24 left-0 right-0 h-64 bg-gradient-to-r from-brand-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-3xl -z-10" />
      <motion.div style={{ y: y2 }} className="absolute -top-10 left-1/4 h-40 w-40 rounded-full bg-brand-500/20 blur-2xl -z-10" />
      <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2">
        <div>
          <h1 className="font-[var(--font-playfair)] text-[clamp(2.25rem,6vw,5rem)] text-white tracking-tight">Saad Ifli</h1>
          <p className="mt-4 text-[clamp(1rem,2.2vw,1.5rem)] text-neutral-300">
            Full-Stack Developer crafting high-performance web apps with React, Next.js, TypeScript and Node.js. Clean design, premium motion, and accessible UX.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#projects" className="btn-primary">View Projects</Link>
            <Link href="#contact" className="btn-ghost">Contact Me</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-300">
            {['React','Next.js','TypeScript','Node.js','Tailwind','Framer Motion'].map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="justify-self-center">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <div className="absolute inset-0 rounded-2xl glass shadow-glow" />
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image src={figure} alt="Portrait" className="h-full w-full object-cover" priority />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}