'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useContent } from './ContentProvider'

/* The official eOne UK upload of the Nightcrawler "Hard Worker Seeking
   Employment" clip, released as Lou Bloom's video résumé, which is the only
   reason this belongs on a portfolio at all.

   nocookie: YouTube's privacy domain sets no tracking cookies until playback
   actually starts, which matters for the French half of the audience. */
const VIDEO_ID = 'x48m7w9boo0'
const EMBED = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`

/**
 * The easter egg: a quiet text link beside the real CTA that opens the clip.
 *
 * The iframe is mounted ONLY while the dialog is open. A YouTube embed is
 * roughly half a megabyte across dozens of requests, so rendering it eagerly
 * (even hidden) would undo the performance work on this page. Closed, this
 * component costs nothing but its own markup.
 *
 * Unmounting on close also stops playback, which is the behaviour people
 * expect: hiding the iframe would leave audio playing behind the overlay.
 */
export function VideoResume() {
  const { content } = useContent()
  const copy = content.about.easterEgg

  /* No `mounted` guard is needed before portalling: `open` can only become true
     from a click, which is already client-side, so document.body exists by
     then. On the server this renders the trigger and nothing else. */
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) {
      /* Focus goes back where it came from, or a keyboard user is dumped at the
         top of the document. */
      triggerRef.current?.focus()
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab') return

      /* Focus trap. Without it, tabbing walks out of the dialog and into the
         page behind, which is still visible through the scrim. */
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, iframe, [href], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables?.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        /* Deliberately not a Pill: it must never compete with the real CTA
           beside it. Text only, no button chrome.
           text-muted rather than text-faint: faint measures 3.18:1 on the grey
           panel, under the 4.5:1 WCAG AA floor for text this size. Muted is
           5.92:1 and still reads as secondary. */
        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 ease-signature hover:text-ink"
      >
        {copy.trigger}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M5.5 3.5v9l7-4.5-7-4.5Z" />
        </svg>
      </button>

      {/* Rendered into <body> rather than in place.
          This dialog sits inside About, whose Reveal wrapper carries a GSAP
          transform, and a transformed ancestor both creates a stacking context
          and makes `position: fixed` resolve against itself instead of the
          viewport. Left in place, the scrim was painted UNDER the fixed navbar
          and swallowed the clicks meant to close it. A portal escapes every
          ancestor context, which is the only reliable fix. */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm motion-safe:animate-scrim-in"
            onClick={close}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={copy.dialogTitle}
              tabIndex={-1}
              /* The scrim closes on click; the dialog itself must not. */
              onClick={(event) => event.stopPropagation()}
              className="motion-safe:animate-panel-in w-full max-w-3xl overflow-hidden rounded-panel bg-white p-3 shadow-ramp-lg focus-visible:outline-none"
            >
              <div className="relative aspect-video overflow-hidden rounded-card bg-ink">
                <iframe
                  src={EMBED}
                  title={copy.dialogTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <div className="flex items-start justify-between gap-4 px-2 pt-3 pb-1">
                <p className="text-xs leading-relaxed text-muted">{copy.caption}</p>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 font-ui text-sm text-ink transition-colors duration-200 ease-signature hover:text-muted"
                >
                  {copy.close}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
