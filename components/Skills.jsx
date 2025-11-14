"use client"
import { motion } from 'framer-motion'

const chips = [
  'Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Node.js', 'Framer Motion', 'Docker', 'MongoDB', 'Express', 'Odoo', 'ERP', 'PostgreSQL'
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="mb-8 text-center">
        <h2 className="heading font-[var(--font-poppins)]">Skills</h2>
        <p className="subheading mx-auto">Auto‑scrolling carousel of tech I use.</p>
      </div>

      <div className="relative w-full">
        <Marquee items={chips} speed={45} />
        <Marquee items={chips} speed={55} reverse className="mt-4" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent" />
      </div>
    </section>
  )
}

function Marquee({ items, speed = 50, reverse = false, className = '' }) {
  const content = (
    <div className="flex items-center gap-3 sm:gap-4">
      {items.map((t) => (
        <span key={t} className="glass rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm text-white whitespace-nowrap">
          {t}
        </span>
      ))}
    </div>
  )

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        aria-hidden
        className="flex w-max"
        initial={{ x: reverse ? -0 : 0 }}
        animate={{ x: reverse ? -1000 : -1000 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: speed }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused' }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running' }}
      >
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  )
}