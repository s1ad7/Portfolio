'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Content } from '@/lib/content/en'
import type { Locale } from '@/lib/i18n'

type Value = { content: Content; locale: Locale }

const ContentContext = createContext<Value | null>(null)

/**
 * Carries the active locale's copy to client components.
 *
 * They must not call `getContent()` themselves: that imports every dictionary,
 * so both languages would be bundled and shipped to every visitor. The server
 * resolves one dictionary and serialises it here, which means a French visitor
 * downloads French strings and nothing else.
 *
 * Server components skip this entirely and call `getContent(locale)` directly.
 */
export function ContentProvider({
  content,
  locale,
  children,
}: {
  content: Content
  locale: Locale
  children: ReactNode
}) {
  return <ContentContext.Provider value={{ content, locale }}>{children}</ContentContext.Provider>
}

export function useContent(): Value {
  const value = useContext(ContentContext)
  if (!value) throw new Error('useContent must be used inside ContentProvider')
  return value
}
