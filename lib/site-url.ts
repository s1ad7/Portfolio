import { site } from './content'

/**
 * The origin this deployment actually answers on.
 *
 * `site.url` is the domain Saad intends to use. Until it is registered and
 * pointed at Vercel, using it for absolute URLs breaks anything that has to
 * FETCH them: Open Graph images are the visible case, because Discord, WhatsApp
 * and LinkedIn resolve og:image server-side and simply show a broken card when
 * the host does not exist.
 *
 * Resolution order, first match wins:
 *
 *   1. NEXT_PUBLIC_SITE_URL, for an explicit override.
 *   2. The Vercel production domain. Once saadifli.com is added to the project,
 *      this variable BECOMES saadifli.com, so the site corrects itself with no
 *      code change.
 *   3. The per-deployment URL, so preview builds reference themselves rather
 *      than production.
 *   4. site.url, for local builds and any non-Vercel host.
 */
function resolve(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (production) return `https://${production}`

  const deployment = process.env.VERCEL_URL
  if (deployment) return `https://${deployment}`

  return site.url
}

export const siteUrl = resolve()
