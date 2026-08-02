import type { Locale } from './i18n'

/* ---------------------------------------------------------------------------
   Testimonials.

   The research on these is blunt and it drove the shape of this file:

     Anonymous quotes look fake. "Great service!" from "John D." persuades
     nobody, and a quote with no company attached is worse than no quote,
     because it reads as invented and casts doubt on everything near it.

     Specific beats warm. Vague praise converts at roughly half the rate of a
     concrete detail, so "I checked it on my phone" outperforms "great work".

   Hence `company` is REQUIRED and the section refuses to render any entry
   missing it. That is deliberate: it makes shipping a hollow quote impossible
   rather than merely discouraged.

   Everything here must be something a client actually said. Where Saad
   supplied a paraphrase from memory, `verbatim: false` records that, so it can
   be tightened later against the real message.
--------------------------------------------------------------------------- */

export interface Testimonial {
  id: string
  /** REQUIRED. Without it the entry is dropped: see above. */
  company: string
  /**
   * What the company is, per locale. Without it a reader sees a name they do
   * not recognise and cannot tell whether the speaker is a client, a colleague
   * or an invention.
   */
  descriptor: Record<Locale, string>
  /** The person. Strongly wanted; the entry renders without it but weaker. */
  author?: string
  role?: string
  /** Where the work is, so a reader can go and check it. */
  href?: string
  /** False when Saad reconstructed it from memory rather than pasting it. */
  verbatim: boolean
  quote: Record<Locale, string>
}

export const testimonials: Testimonial[] = [
  {
    id: 'everstead-prospects',
    company: 'Everstead',
    descriptor: { en: 'Digital studio, United States', fr: 'Studio digital, États-Unis' },
    /* TODO (Saad): the name and role of whoever said this. A quote attributed
       to a person outperforms one attributed only to a company. */
    href: 'https://www.everstead.llc/',
    verbatim: false,
    quote: {
      en: 'The day after launch our own prospects were talking about the site. Some asked whether they could have those animations on their projects.',
      fr: 'Le lendemain de la mise en ligne, nos propres prospects parlaient du site. Certains ont demandé s’ils pouvaient avoir ces animations sur leurs projets.',
    },
  },
  {
    id: 'mobile-check',
    company: 'StreamElite',
    descriptor: { en: 'Streaming subscriptions', fr: 'Abonnements streaming' },
    /* TODO (Saad): the name and role of whoever said this. */
    href: 'https://www.premiumstreamiptv.com/',
    verbatim: false,
    quote: {
      en: 'I checked it on my phone because I did not have my Mac with me, and I was impressed. It was clean.',
      fr: 'Je l’ai regardé sur mon téléphone parce que je n’avais pas mon Mac, et j’ai été impressionné. C’était propre.',
    },
  },
  {
    /* The strongest of the three, because it reports a change in behaviour
       rather than a feeling. Saad's first version of this was "the result was
       what we asked for", which is the vague kind that converts at roughly
       half the rate; asking him what actually changed produced the channel
       shift below. Worth doing for every future quote. */
    id: 'carently-bookings',
    company: 'Carently',
    descriptor: { en: 'Car rental platform, Morocco', fr: 'Plateforme de location, Maroc' },
    /* TODO (Saad): the name and role of whoever said this. */
    href: 'https://www.carently.net/',
    verbatim: false,
    quote: {
      en: 'With the old site clients would almost always call us to book. Now they go through the website. They find it faster, and it is easier for us to follow up.',
      fr: 'Avec l’ancien site, les clients nous appelaient presque toujours pour réserver. Maintenant ils passent par le site. Ils trouvent cela plus rapide, et le suivi est plus simple pour nous.',
    },
  },
]

/** Only entries a reader could actually check. See the note at the top. */
export const publishedTestimonials = testimonials.filter((t) => t.company.trim() !== '')
