export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

/** English is canonical: it is what `/` redirects to and what x-default points at. */
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Used for `lang` and `hreflang`. Regional codes help Google target correctly. */
export const htmlLang: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
}

export const localeFlags: Record<Locale, 'gb' | 'fr'> = {
  en: 'gb',
  fr: 'fr',
}

/** `/en` and `/fr`. Kept in one place so links and metadata cannot disagree. */
export function localePath(locale: Locale): string {
  return `/${locale}`
}
