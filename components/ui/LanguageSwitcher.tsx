'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { locales, localeFlags, localeNames, type Locale } from '@/lib/i18n'
import { Flag } from './Flag'

/**
 * The flag dropdown from the reference's navbar: a pill showing the current
 * locale's flag with a chevron that rotates open, and a menu of locales.
 *
 * Each entry is a real `<a href="/fr">`, deliberately not a client-side
 * transition. Switching language should reload the document so the html `lang`
 * attribute, the metadata and the JSON-LD all change together; a soft
 * navigation would leave the old ones in place. Plain anchors also mean the
 * control works before hydration and is crawlable, which is how the alternate
 * language gets discovered.
 */
export function LanguageSwitcher({ current = 'en' }: { current?: Locale }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = `lang-menu-${useId().replace(/:/g, '')}`

  const active = { code: current, flag: localeFlags[current], label: localeNames[current] }

  /* Close on outside click and on Escape. */
  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={`Language: ${active.label}. Change language`}
        /* Measured off the reference: 69x36 box, 12px radius (a rounded
           rectangle, not a capsule), 1px #ededed border, white fill, no shadow,
           8px/8px/8px/12px padding and a 4px gap. */
        className="inline-flex min-h-11 items-center gap-1 rounded-[12px] border border-hairline bg-white py-2 pr-2 pl-3 text-muted transition-colors duration-200 ease-signature hover:border-line hover:text-ink"
      >
        <Flag code={active.flag} />
        {/* ~10px wide and near-ink, matching the reference. A 12px box with the
            path inset to 3..9 rendered only 6px of visible chevron, which read
            as a much smaller, lighter mark than the original. */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`text-ink/85 transition-transform duration-200 ease-signature ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path
            d="M3 6L8 11L13 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          className="animate-menu-in absolute top-full left-0 z-50 mt-2 min-w-[11rem] overflow-hidden rounded-[12px] border border-hairline bg-white py-1.5 shadow-ramp-lg"
        >
          {locales.map((code) => {
            const isActive = code === current

            return (
              <li key={code} role="none">
                <a
                  role="menuitem"
                  href={`/${code}`}
                  hrefLang={code}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center gap-2.5 px-3.5 py-2 text-sm text-ink transition-colors duration-200 ease-signature hover:bg-panel"
                >
                  <Flag code={localeFlags[code]} />
                  <span className="flex-1">{localeNames[code]}</span>
                  {isActive && <span className="text-accent">&#10003;</span>}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
