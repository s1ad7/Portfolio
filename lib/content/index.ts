import type { Locale } from '../i18n'
import { projects, type ProjectMeta } from '../site'
import { en, type Content } from './en'
import { fr } from './fr'

export type { Content }

const dictionaries = { en, fr } as const

/**
 * The copy for a locale.
 *
 * Server components call this directly. Client components must NOT: importing
 * it pulls both dictionaries into the browser bundle. They read the active
 * dictionary from ContentProvider instead, which serialises only the locale
 * being rendered.
 */
export function getContent(locale: Locale): Content {
  return dictionaries[locale]
}

/**
 * The stat band's numbers.
 *
 * Deliberately not in the dictionaries: these are facts, and a number that
 * lived in each translation could end up claiming 30 in one language and 40 in
 * the other. Only the labels are translated.
 *
 * `featured` and the rest must stay TRUE, they animate and draw the eye. The
 * Lighthouse figure was measured with Lighthouse 12 (desktop preset) on
 * 2026-08-01: ac-peds scored 99, acscripts 98. Re-measure before raising it.
 */
export function getStats(content: Content) {
  const { statLabels } = content.about
  return [
    { value: 30, suffix: '+', label: statLabels.delivered },
    /* Derived from the project list, so it can never disagree with the grid. */
    { value: projects.length, suffix: '', label: statLabels.featured },
    { value: 3, suffix: '+', label: statLabels.years },
    { value: 99, suffix: '', label: statLabels.lighthouse },
  ]
}

export type Stat = ReturnType<typeof getStats>[number]

/**
 * Fills `{name}` placeholders.
 *
 * The dictionaries hold templates rather than functions because they are
 * serialised across the server to client boundary, and a function cannot ride
 * in an RSC payload.
 */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  )
}

/**
 * A project card: the invariant data (slug, title, URLs, image) merged with the
 * active locale's category and description.
 *
 * Typing the lookup against `Content['projects']` means adding a project to
 * lib/site.ts without writing its copy in BOTH dictionaries is a compile error,
 * not a card that renders with a blank description in one language.
 */
export interface ProjectCardData extends ProjectMeta {
  category: string
  description: string
}

export function getProjectCards(content: Content): ProjectCardData[] {
  return projects.map((project) => {
    const copy = content.projects[project.slug as keyof Content['projects']]
    return { ...project, ...copy }
  })
}
