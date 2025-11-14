"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

const ids = ['home','about','skills','projects','contact']

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight
      const p = h > 0 ? window.scrollY / h : 0
      setProgress(Math.max(0, Math.min(1, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: 0.6 })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="relative h-[60vh] w-[3px] bg-white/10 rounded-full overflow-hidden">
        <div className="absolute left-0 top-0 w-full bg-gradient-to-b from-brand-500 to-indigo-500" style={{ height: `${progress * 100}%` }} />
        {ids.map((id, i) => {
          const top = (i / (ids.length - 1)) * 100
          const isActive = active === id
          return (
            <Link key={id} href={`#${id}`} className="group" aria-label={`Go to ${id}`}>
              <div className="absolute -left-2" style={{ top: `${top}%` }}>
                <div className={`h-3 w-3 rounded-full border border-white/20 transition-transform ${isActive ? 'bg-brand-500 scale-110 shadow-glow' : 'bg-white/5'}`} />
              </div>
              <div className="absolute -left-2 ml-6 -translate-y-1/2 text-xs tracking-wide text-neutral-400 group-hover:text-neutral-200" style={{ top: `${top}%` }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}