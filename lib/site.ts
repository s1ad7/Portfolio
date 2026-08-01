/* ---------------------------------------------------------------------------
   Everything here is the same in every language: identity, links, and the
   URLs, images and slugs of the work.

   Translatable copy lives in lib/content/<locale>.ts. Keeping the two apart
   means a project's live URL and screenshot are defined exactly once, so the
   English and French cards can never point at different sites.
--------------------------------------------------------------------------- */

export const site = {
  name: 'Saad Ifli',
  /** Split for the two-line wordmark in the nav and footer. */
  firstName: 'Saad',
  lastName: 'Ifli',
  /* Not yet registered. Absolute URLs resolve through lib/site-url.ts, which
     prefers the live deployment until this domain exists. */
  url: 'https://saadifli.com',
  email: 'iflisaad17@gmail.com',
  links: {
    /* Drives both the footer link and the contribution calendar in About. */
    github: 'https://github.com/s1ad7',
    linkedin: 'https://www.linkedin.com/in/saad-ifli/',
  },
} as const

export interface ProjectMeta {
  /** Short slug. Also the screenshot filename: /projects/<slug>.jpg, and the
   *  key the per-locale copy is looked up under. */
  slug: string
  /** A brand name, so it is not translated. */
  title: string
  image: string
  /** Live site. This is what visitors click. */
  href: string
  /**
   * Where to screenshot from, when that differs from `href`. Several custom
   * domains do not resolve from every network, so the capture runs against the
   * Vercel deployment while the portfolio still shows the real domain.
   */
  captureUrl?: string
}

/**
 * The live sites, in display order: strongest work first.
 *
 * Screenshots come from `npm run capture:projects`, which reads this list.
 */
export const projects: ProjectMeta[] = [
  {
    /* everstead.llc does not resolve from every network, so this card's collage
       was built from supplied screenshots via `npm run compose:card` rather than
       the automated capture. Same composer, same output. */
    slug: 'everstead',
    title: 'Everstead',
    image: '/projects/everstead.jpg',
    href: 'https://www.everstead.llc/',
  },
  {
    slug: 'carently',
    title: 'Carently',
    image: '/projects/carently.jpg',
    href: 'https://www.carently.net/',
  },
  {
    slug: 'streamelite',
    title: 'StreamElite',
    image: '/projects/streamelite.jpg',
    href: 'https://www.premiumstreamiptv.com/',
    captureUrl: 'https://streamelite-two.vercel.app/',
  },
  {
    slug: 'marbio',
    title: 'Marbio',
    image: '/projects/marbio.jpg',
    href: 'https://marbio.com/',
  },
  {
    slug: 'acscripts',
    title: 'ACScripts',
    image: '/projects/acscripts.jpg',
    href: 'https://scripts.aczone.xyz/',
    captureUrl: 'https://acsripts.vercel.app/',
  },
  {
    slug: 'acpins',
    title: 'ACPins',
    image: '/projects/acpins.jpg',
    href: 'https://pins.aczone.xyz/',
    captureUrl: 'https://ac-pins.vercel.app/',
  },
  {
    slug: 'acpeds',
    title: 'ACPeds',
    image: '/projects/acpeds.jpg',
    href: 'https://peds.aczone.xyz/',
    captureUrl: 'https://ac-peds.vercel.app/',
  },
]
