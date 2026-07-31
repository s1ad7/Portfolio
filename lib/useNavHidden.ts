'use client'

import { useEffect, useState } from 'react'

/** Ignore jitter below this many pixels, so the bar does not flicker. */
const THRESHOLD = 8

/** Always show the bar within this distance of the top of the page. */
const TOP_ZONE = 140

/**
 * True while the navbar should be tucked away.
 *
 * Hides on downward scroll and returns on upward scroll, which gives content the
 * full viewport while reading and puts navigation one flick away. Shared by the
 * navbar itself and by the pinned projects panel, so the panel can reclaim the
 * 80px the bar would otherwise reserve, rather than the two disagreeing about
 * whether the bar is there.
 *
 * Reads scroll position inside a rAF rather than on every scroll event: the
 * listener can fire many times per frame, and touching scrollY in the handler
 * forces layout each time.
 */
export function useNavHidden(disabled = false) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Derived below rather than pushed through setState here: writing state
    // straight from an effect body is an extra render and a lint error.
    if (disabled) return

    let last = window.scrollY
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      const delta = y - last

      if (y < TOP_ZONE) {
        last = y
        setHidden(false)
        return
      }
      if (Math.abs(delta) < THRESHOLD) return

      last = y
      setHidden(delta > 0)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [disabled])

  // While disabled the bar is pinned open regardless of scroll history.
  return disabled ? false : hidden
}
