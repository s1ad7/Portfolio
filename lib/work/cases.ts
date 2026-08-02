import type { Locale } from '../i18n'

/* ---------------------------------------------------------------------------
   Case studies.

   A project card says what a site IS. A case study says what it CHANGED, and
   that is the difference that converts: the client is not buying a website,
   they are buying the move from the first image to the second.

   Honesty rule for this file, which matters more here than anywhere else on
   the site: `outcome` stays empty until Saad supplies something real. An
   invented result is the one lie a prospective client can actually catch, by
   asking about it on a call, and it would discredit every true number beside
   it. The page renders correctly without it.
--------------------------------------------------------------------------- */

export interface CaseCopy {
  slug: string
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string
  /** Brief, work, result. Rendered in order. */
  sections: { heading: string; body: string }[]
  /** Facts about the build. Safe to state because they are observable. */
  facts: { label: string; value: string }[]
  visitLabel: string
  /**
   * Client-supplied outcome. Left empty deliberately; the section does not
   * render at all while it is. See the honesty rule above.
   */
  outcome?: { heading: string; body: string }
}

export interface CaseStudy {
  id: string
  /** Matches a slug in lib/site.ts, so the live URL and image come from there. */
  projectSlug: string
  /**
   * The old design. Undefined until the file exists, and the comparison simply
   * does not render while it is: a slider with one image is broken, and a
   * placeholder shipped to production is worse.
   */
  beforeImage?: string
  copy: Record<Locale, CaseCopy>
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'everstead',
    projectSlug: 'everstead',
    /* Waiting on the export of the old design. Drop it at
       public/work/everstead-before.jpg and set this to that path. */
    beforeImage: undefined,
    copy: {
      fr: {
        slug: 'refonte-site-everstead',
        title: 'Refonte du site Everstead',
        description:
          'Refonte complète du site d’un studio digital : identité sombre, typographie condensée, et un processus en six étapes déroulé au scroll.',
        eyebrow: 'Étude de cas',
        h1: 'Everstead, refonte complète',
        intro:
          'Everstead est un studio digital. Leur site devait faire ce qu’il vend : donner en quelques secondes le sentiment d’un travail soigné, puis expliquer comment ils travaillent sans transformer la page en documentation.',
        sections: [
          {
            heading: 'Le parti pris',
            body: 'Une identité presque noire, une typographie display condensée très marquée, et un seul accent doré. Un accent unique force les arbitrages : quand une seule couleur peut attirer l’œil, il faut décider ce qui compte vraiment sur chaque écran.',
          },
          {
            heading: 'Le processus déroulé au scroll',
            body: 'Le cœur du site est un enchaînement en six étapes, du cadrage au lancement, qui se déroule à mesure que le visiteur descend. C’est une façon de raconter une méthode sans en faire une page de texte : on avance dans le processus au lieu de le lire.',
          },
          {
            heading: 'Montrer pour qui ils travaillent',
            body: 'La suite est une grille des secteurs adressés. Un visiteur cherche d’abord à savoir si ce studio a déjà travaillé pour quelqu’un comme lui, et cette grille répond à la question avant qu’elle ne soit posée.',
          },
        ],
        facts: [
          { label: 'Type', value: 'Site d’agence' },
          { label: 'Rôle', value: 'Conception et développement' },
          { label: 'Langue', value: 'Anglais' },
        ],
        visitLabel: 'Voir le site en ligne',
      },
      en: {
        slug: 'everstead-website-redesign',
        title: 'Everstead Website Redesign',
        description:
          'A full redesign for a digital studio: near-black identity, heavy condensed display type, and a six-stage process that unfolds as you scroll.',
        eyebrow: 'Case study',
        h1: 'Everstead, a full redesign',
        intro:
          'Everstead is a digital studio. Their site had to do the thing it sells: convey careful work within seconds, then explain how they operate without turning the page into documentation.',
        sections: [
          {
            heading: 'The decision',
            body: 'A near-black identity, heavy condensed display type, and a single gold accent. One accent forces the trade-offs: when only one colour can pull the eye, you have to decide what actually matters on each screen.',
          },
          {
            heading: 'The process, unfolded by scrolling',
            body: 'The spine of the site is a six-stage sequence, discovery through to launch, that unfolds as the visitor moves down the page. It tells a methodology without becoming a wall of text: you move through the process instead of reading it.',
          },
          {
            heading: 'Showing who they build for',
            body: 'It ends in a grid of the industries they serve. A visitor first wants to know whether this studio has worked for someone like them, and the grid answers that before it is asked.',
          },
        ],
        facts: [
          { label: 'Type', value: 'Agency site' },
          { label: 'Role', value: 'Design and build' },
          { label: 'Language', value: 'English' },
        ],
        visitLabel: 'Visit the live site',
      },
    },
  },
]

export function findCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.copy[locale].slug === slug)
}

/** Only studies complete enough to publish: a comparison needs both images. */
export const publishedCaseStudies = caseStudies.filter((study) => Boolean(study.beforeImage))
