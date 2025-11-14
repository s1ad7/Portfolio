"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import figure from '../Figure.jpg'

const projects = [
  {
    title: 'Premium Portfolio',
    summary: 'Modern Next.js + Tailwind portfolio with parallax and micro-interactions.',
    tags: ['Next.js','Tailwind','Framer Motion'],
    img: figure,
    live: '#',
    code: 'https://github.com/saadifli'
  },
  {
    title: 'Dashboard UI',
    summary: 'Accessible dashboard with data viz and dynamic theming.',
    tags: ['React','TypeScript','D3'],
    img: figure,
    live: '#',
    code: 'https://github.com/saadifli'
  },
  {
    title: 'API Starter',
    summary: 'Node/Express starter with JWT auth and testing.',
    tags: ['Node.js','Express','Jest'],
    img: figure,
    live: '#',
    code: 'https://github.com/saadifli'
  },
]

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="section">
      <div className="mb-8 text-center">
        <h2 className="heading font-[var(--font-poppins)]">Projects</h2>
        <p className="subheading mx-auto">Hover tilt, glass cards, and modal details.</p>
      </div>

      <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <TiltCard key={p.title} onClick={() => setActive(idx)}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-2xl glass">
              <div className="relative aspect-[16/9]">
                <Image src={p.img} alt={`${p.title} cover`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute inset-0" />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-neutral-300 text-sm">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {p.tags.map(t => (
                    <span key={t} className="glass rounded-full px-2 py-0.5">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <a href={p.live} onClick={(e) => e.stopPropagation()} className="btn-ghost px-3 py-1.5">Live</a>
                  <a href={p.code} onClick={(e) => e.stopPropagation()} target="_blank" className="btn-primary px-3 py-1.5">Code</a>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" onClick={() => setActive(null)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="glass max-w-xl w-full rounded-2xl p-0 relative overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image src={projects[active].img} alt={`${projects[active].title} cover`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-semibold">{projects[active].title}</h3>
                <p className="mt-2 text-neutral-300">{projects[active].summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {projects[active].tags.map(t => (
                    <span key={t} className="glass rounded-full px-2 py-0.5">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <a href={projects[active].live} target="_blank" className="btn-ghost px-3 py-1.5">Live</a>
                  <a href={projects[active].code} target="_blank" className="btn-primary px-3 py-1.5">Code</a>
                </div>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close" className="absolute right-3 top-3 btn-ghost px-2">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function TiltCard({ children, onClick }) {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = -(y / rect.height - 0.5) * 10
    const ry = (x / rect.width - 0.5) * 10
    e.currentTarget.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const reset = (e) => { e.currentTarget.style.transform = 'rotateX(0) rotateY(0)' }
  return (
    <div onMouseMove={handleMove} onMouseLeave={reset} onClick={onClick} className="glass rounded-2xl shadow-soft transition-transform will-change-transform cursor-pointer">
      {children}
    </div>
  )
}