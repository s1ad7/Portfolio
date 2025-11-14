"use client"
import Lottie from 'lottie-react'

// Minimal pulse dot animation
const pulse = {
  v: "5.7.4",
  fr: 60,
  w: 64,
  h: 64,
  ip: 0,
  op: 120,
  assets: [],
  layers: [
    {
      ty: 4,
      nm: "dot",
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [
          { t: 0, s: [80, 80, 100] },
          { t: 60, s: [100, 100, 100] },
          { t: 120, s: [80, 80, 100] }
        ] }
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [16, 16] },
          d: 1
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.29, 0.52, 1, 1] },
          o: { a: 0, k: 100 },
          r: 1
        }
      ]
    }
  ]
}

export default function AnimatedIcon({ className }) {
  return <Lottie animationData={pulse} loop={true} autoplay={true} className={className} />
}