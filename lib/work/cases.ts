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
  /**
   * The live site, cropped to the SAME region of the page as the before. The
   * project card's collage is a composed, rotated montage: striking in a grid,
   * useless in a comparison, because the eye cannot tell a design change from a
   * framing change. Falls back to the collage when absent.
   */
  afterImage?: string
  copy: Record<Locale, CaseCopy>
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'everstead',
    projectSlug: 'everstead',
    /* Both cropped to the same slice of each page, the hero and what sits
       under it, so the slider compares like with like. The before was
       recaptured at 1017px and had its device frame detected and stripped, so
       it renders at about 1.2x rather than the 4.2x of the first attempt: a
       framed mockup beside a raw screenshot reads as two different KINDS of
       image, which distracts from the only difference that matters. */
    beforeImage: '/work/everstead-before.jpg',
    afterImage: '/work/everstead-after.jpg',
    copy: {
      fr: {
        slug: 'refonte-site-everstead',
        title: 'Refonte du site Everstead',
        description:
          'D’un modèle d’agence générique à une identité qu’on ne confond pas. Refonte complète du site d’un studio digital : avant, après, et les décisions entre les deux.',
        eyebrow: 'Étude de cas',
        h1: 'Everstead : d’un modèle à une identité',
        intro:
          'Everstead est un studio digital américain qui cherchait à changer d’échelle. Leur ancien site ne montrait pas ce dont ils étaient capables : fond clair, accent violet, trois cartes de services, quatre pastilles numérotées intitulées « notre approche méthodique ». Rien n’était mal fait, et c’est exactement le problème : rien ne les distinguait. En discutant, on est arrivés à une conclusion simple. Pour un studio qui vend du design, le site n’est pas une brochure, c’est la démonstration.',
        sections: [
          {
            heading: 'Le site devait prouver, pas décrire',
            body: 'C’est la décision prise ensemble avant la première maquette : ce que les gens voient doit refléter ce que l’équipe sait faire. Un studio de design qui ressemble à un gabarit se contredit lui-même. La refonte part de là, en retirant tout ce qui aurait pu appartenir à une autre agence.',
          },
          {
            heading: 'Une identité qu’on ne confond pas',
            body: 'Fond presque noir, typographie display condensée à très grande échelle, et un seul accent doré. Un accent unique force les arbitrages : quand une seule couleur peut attirer l’œil, il faut décider ce qui compte réellement sur chaque écran. Les services, présentés avant en trois cartes, sont devenus une liste franche de neuf lignes.',
          },
          {
            heading: 'Un processus qu’on traverse, pas qu’on lit',
            body: 'Les quatre pastilles « approche méthodique » ont laissé place à un enchaînement en six étapes, du cadrage au lancement, qui se déroule à mesure que le visiteur descend. On avance dans la méthode au lieu d’en lire le résumé. La grille « pour qui nous construisons » répond ensuite à la seule question que se pose un prospect : avez-vous déjà travaillé pour quelqu’un comme moi.',
          },
        ],
        outcome: {
          heading: 'Ce qui s’est passé ensuite',
          body: 'Le lendemain de la mise en ligne, Everstead est revenu vers moi : leurs propres prospects réagissaient au nouveau site. Certains sont allés plus loin et ont demandé s’ils pouvaient avoir les mêmes animations sur leurs projets. Pour un studio qui vend du design, c’est le résultat qui compte : le site a cessé de décrire ce qu’ils savent faire pour commencer à en créer la demande.',
        },
        facts: [
          { label: 'Type', value: 'Site d’agence' },
          { label: 'Rôle', value: 'Refonte complète' },
          { label: 'Portée', value: 'Identité, structure, développement' },
        ],
        visitLabel: 'Voir le site en ligne',
      },
      en: {
        slug: 'everstead-website-redesign',
        title: 'Everstead Website Redesign',
        description:
          'From a generic agency template to an identity nobody confuses. A full redesign for a digital studio: before, after, and the decisions in between.',
        eyebrow: 'Case study',
        h1: 'Everstead: from template to identity',
        intro:
          'Everstead is a US digital studio that wanted to scale. Their old site did not show what they were capable of: light ground, purple accent, three service cards, four numbered circles labelled "our methodical approach". Nothing about it was badly made, and that was exactly the problem, because nothing about it was theirs. Talking it through, we landed somewhere simple. For a studio that sells design, the site is not a brochure. It is the demonstration.',
        sections: [
          {
            heading: 'The site had to prove it, not describe it',
            body: 'That was the decision we reached before the first mockup: what people see has to reflect what the team can actually do. A design studio that looks like a template contradicts itself. The redesign started there, taking out anything that could have belonged to another agency.',
          },
          {
            heading: 'An identity nobody confuses',
            body: 'Near-black ground, condensed display type at enormous scale, and a single gold accent. One accent forces the trade-offs: when only one colour can pull the eye, you have to decide what actually matters on each screen. The services, previously three cards, became a blunt nine-line list.',
          },
          {
            heading: 'A process you move through, not one you read',
            body: 'The four "methodical approach" circles gave way to a six-stage sequence, discovery through to launch, that unfolds as the visitor scrolls. You advance through the method instead of reading a summary of it. The "who we build for" grid then answers the only question a prospect actually has: have you worked for someone like me.',
          },
        ],
        outcome: {
          heading: 'What happened next',
          body: 'The day after launch, Everstead came back to me: their own prospects were reacting to the new site. Some went further and asked whether they could have those animations on their projects. For a studio that sells design, that is the result that counts. The site stopped describing what they can do and started generating demand for it.',
        },
        facts: [
          { label: 'Type', value: 'Agency site' },
          { label: 'Role', value: 'Full redesign' },
          { label: 'Scope', value: 'Identity, structure, build' },
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
