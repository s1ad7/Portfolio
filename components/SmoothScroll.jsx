"use client"
import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let lenis
    let rafId
    let anchors = []
    ;(async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, smoothTouch: false, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      const on = (time) => { lenis.raf(time); rafId = requestAnimationFrame(on) }
      rafId = requestAnimationFrame(on)
      anchors = Array.from(document.querySelectorAll('a[href^="#"]'))
      const handler = (e) => {
        const href = e.currentTarget.getAttribute('href')
        if (!href) return
        e.preventDefault()
        lenis.scrollTo(href, { offset: -96 })
      }
      anchors.forEach(a => a.addEventListener('click', handler))
    })()
    return () => {
      anchors.forEach(a => a.removeEventListener('click', () => {}))
      if (lenis) lenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
  return null
}