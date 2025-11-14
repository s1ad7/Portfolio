"use client"
import { useEffect, useRef } from 'react'

export default function SpaceBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let stars = []
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor(window.innerWidth * window.innerHeight / 11000)
      stars = Array.from({ length: count }).map(() => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, r: Math.random() * 1.5 + 0.2, o: Math.random() * 0.8 + 0.2 }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const s of stars) {
        ctx.globalAlpha = s.o
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    const loop = () => { draw(); requestAnimationFrame(loop) }
    resize(); loop()
    const onResize = () => { resize(); draw() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return (
    <div className="fixed inset-0 -z-20 bg-neutral-950">
      <canvas ref={ref} className="absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[28vh] bg-gradient-to-t from-fuchsia-600/30 via-indigo-500/10 to-transparent blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[20vh] rounded-[50%] bg-white/5 blur-2xl opacity-40" />
    </div>
  )
}