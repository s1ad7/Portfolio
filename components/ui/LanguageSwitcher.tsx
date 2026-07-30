'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { ease } from '@/lib/motion'
import { Flag } from './Flag'

export type LocaleCode = 'en' | 'fr'

type Locale = {
  code: LocaleCode
  flag: 'gb' | 'fr'
  label: string
  /** Where switching to this locale should navigate. Null until it exists. */
  href: string | null
}

/**
 * Locale list. Add an `href` here the moment a locale's route exists and it
 * becomes selectable; nothing else needs changing.
 */
const LOCALES: Locale[] = [
  { code: 'en', flag: 'gb', label: 'English', href: '/' },
  { code: 'fr', flag: 'fr', label: 'Français', href: null },
]

/**
 * The flag dropdown from the reference's navbar: a pill showing the current
 * locale's flag with a chevron that rotates open, and a menu of locales.
 *
 * Locales without a route yet render as disabled menu items rather than being
 * hidden, so the control is genuinely interactive without silently doing
 * nothing when picked.
 */
export function LanguageSwitcher({ current = 'en' }: { current?: LocaleCode }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = `lang-menu-${useId().replace(/:/g, '')}`

  const active = LOCALES.find((l) => l.code === current) ?? LOCALES[0]

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
        className="inline-flex items-center gap-1 rounded-[12px] border border-hairline bg-white py-2 pr-2 pl-3 text-muted transition-colors duration-200 ease-signature hover:border-line hover:text-ink"
      >
        <Flag code={active.flag} />
        {/* ~10px wide and near-ink, matching the reference. A 12px box with the
            path inset to 3..9 rendered only 6px of visible chevron, which read
            as a much smaller, lighter mark than the original. */}
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="text-ink/85"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease }}
        >
          <path
            d="M3 6L8 11L13 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease }}
            className="absolute left-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-[12px] border border-hairline bg-white py-1.5 shadow-ramp-lg"
          >
            {LOCALES.map((locale) => {
              const isActive = locale.code === active.code
              const available = locale.href !== null

              return (
                <li key={locale.code} role="none">
                  <a
                    role="menuitem"
                    href={available ? locale.href! : undefined}
                    aria-current={isActive ? 'true' : undefined}
                    aria-disabled={available ? undefined : 'true'}
                    onClick={(e) => {
                      if (!available) e.preventDefault()
                      else setOpen(false)
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors duration-200 ease-signature ${
                      available
                        ? 'text-ink hover:bg-panel'
                        : 'cursor-not-allowed text-faint'
                    }`}
                  >
                    <Flag code={locale.flag} />
                    <span className="flex-1">{locale.label}</span>
                    {isActive && <span className="text-accent">&#10003;</span>}
                    {!available && <span className="text-[11px] text-faint">soon</span>}
                  </a>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
