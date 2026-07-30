'use client'

import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

/**
 * The language switcher pill, occupying the same slot as the reference's.
 *
 * PRESENTATION ONLY FOR NOW. The site is English-only until the copy is final,
 * so this renders as a disabled control rather than pretending to work: it is a
 * <button disabled> with an honest title, so nothing invites a click that would
 * do nothing.
 *
 * To wire it up later:
 *   1. split lib/content.ts into per-locale files behind a Content type
 *   2. move the page under app/[locale] with generateStaticParams for the locales
 *   3. turn this into a menu that routes between locales, preserving the hash
 *
 * Locale codes are used rather than flag emoji deliberately: regional-indicator
 * flags do not render on Windows, and a flag names a country, not a language.
 */
export function LanguageSwitcher({ locale = 'EN' }: { locale?: string }) {
  return (
    <button
      type="button"
      disabled
      title="More languages coming soon"
      className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-muted"
    >
      {locale}
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        transition={{ duration: 0.2, ease }}
      >
        <path
          d="M3 5L6 8L9 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </button>
  )
}
