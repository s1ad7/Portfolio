/* ---------------------------------------------------------------------------
   Every piece of copy and data on the site lives here. Nothing textual is
   hardcoded in a component, so adding a project or reworking the bio means
   editing this file only.

   Items marked TODO are placeholders awaiting real CV content.
--------------------------------------------------------------------------- */

export const site = {
  name: 'Saad Ifli',
  /** Split for the two-line wordmark in the nav and footer. */
  firstName: 'Saad',
  lastName: 'Ifli',
  role: 'Full-Stack Developer',
  description:
    'Full-stack developer building web applications and Odoo/ERP integrations. React, Next.js, TypeScript, Node.js.',
  /** TODO: replace with the real production domain once deployed. */
  url: 'https://saadifli.dev',
  tagline: 'Built with structure, shipped with care.',
  email: 'contact@saadifli.dev',
  location: 'Morocco',
  links: {
    github: 'https://github.com/saadifli',
    linkedin: 'https://www.linkedin.com/in/saad-ifli/',
  },
} as const

/** Nav order and anchor ids. Section components read their ids from here. */
export const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'FAQ', href: '#faq' },
] as const

export const hero = {
  badge: 'Full-Stack Developer · Morocco',
  /** Rendered as: "Hi," [portrait] "I'm Saad!" */
  greeting: 'Hi,',
  headline: "I'm Saad!",
  subline:
    'I build clean, dependable web applications that feel effortless to use and are built to last.',
  portraitAlt: 'Illustrated portrait of Saad Ifli',
} as const

export interface Project {
  /** Short slug. Also the screenshot filename: /projects/<slug>.jpg */
  slug: string
  /** Small label above the title, e.g. "Booking Platform". */
  category: string
  title: string
  /** Shown on the card, under the title. */
  description: string
  /** Tech chips, detected from the running sites rather than assumed. */
  stack: readonly string[]
  /**
   * Hero screenshot, used full-bleed behind the text. A single viewport-sized
   * shot rather than a full-page capture: the panel only ever shows the top of
   * the site, so the tall captures were several MB each for a crop.
   */
  image: string
  /** Live site. This is what visitors click and what the panel links to. */
  href: string
  /**
   * Where to screenshot from, when that differs from `href`. Several custom
   * domains do not resolve from every network, so the capture runs against the
   * Vercel deployment while the portfolio still shows the real domain.
   */
  captureUrl?: string
}

/**
 * The live sites, in display order. Everything here was read off the running
 * site, so the descriptions are accurate rather than guessed.
 *
 * Screenshots come from `npm run capture:projects`, which reads this list.
 *
 * Order is deliberate: Everstead, Carently, StreamElite, Marbio, then the rest.
 *
 * Everstead is the gap. It should sit first, but everstead.llc does not resolve
 * from here and no Vercel deployment was given for it, so there is nothing to
 * capture or describe honestly. Add an entry with a `captureUrl` and re-run the
 * capture, and it will lead the list.
 */
export const projects: Project[] = [
  {
    /* TODO (Saad): everstead.llc did not resolve from the machine this was
       written on, so this entry is staged but unfinished. Two things are needed:

         1. The artwork. Run `npm run capture:projects -- everstead` locally,
            where the domain resolves for you. If it does not resolve there
            either, add `captureUrl` below pointing at a Vercel deployment, the
            way the other entries do, and the capture will use that while the
            card still links to the real domain.
         2. The category and description. Both are placeholders: the site could
            not be read, so anything specific here would be invented.

       Until then it ships a neutral placeholder image rather than a screenshot
       of work that is not this project. */
    slug: 'everstead',
    category: 'TODO: category',
    title: 'Everstead',
    description:
      'TODO: replace. One or two sentences on what the site is and what you built.',
    stack: ['TODO: stack'],
    image: '/projects/everstead.jpg',
    href: 'https://www.everstead.llc/',
    // captureUrl: 'https://<vercel-deployment>.vercel.app/',
  },
  {
    slug: 'carently',
    stack: ['Tailwind CSS', 'Vercel', 'French'],
    category: 'Booking Platform',
    title: 'Carently',
    description:
      'Car rental platform for Morocco. Visitors browse the fleet, see featured vehicles and reviews, and book through a guided flow, with a separate sign-up path for partners listing their own cars.',
    image: '/projects/carently.jpg',
    href: 'https://www.carently.net/',
  },
  {
    slug: 'streamelite',
    stack: ['Next.js', 'Tailwind CSS', 'Vercel', 'French'],
    category: 'Subscription Site',
    title: 'StreamElite',
    description:
      'Subscription site for a streaming service, served in French. Channel browser, tiered pricing, blog and FAQ, all pointed at getting a visitor onto a plan.',
    image: '/projects/streamelite.jpg',
    href: 'https://www.premiumstreamiptv.com/',
    captureUrl: 'https://streamelite-two.vercel.app/',
  },
  {
    slug: 'marbio',
    stack: ['WordPress', 'GSAP', 'French'],
    category: 'Corporate Site',
    title: 'Marbio',
    description:
      'Corporate site for a vaccine bioproduction company, covering governance, partners, services and production across a deep multi-section structure. Built on WordPress, in French.',
    image: '/projects/marbio.jpg',
    href: 'https://marbio.com/',
  },
  {
    slug: 'acscripts',
    stack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    category: 'E-commerce',
    title: 'ACScripts',
    description:
      'Storefront for a premium software catalogue, covering individual products, bundles, custom-work enquiries and customer accounts behind a login.',
    image: '/projects/acscripts.jpg',
    href: 'https://scripts.aczone.xyz/',
    captureUrl: 'https://acsripts.vercel.app/',
  },
  {
    slug: 'acpins',
    stack: ['Next.js', 'Tailwind CSS', 'Vercel'],
    category: 'E-commerce',
    title: 'ACPins',
    description:
      'Storefront for digital game cards, top-ups and subscriptions in Morocco, priced in dirhams with codes delivered over WhatsApp. Spans gift cards, pins, subscriptions and game keys.',
    image: '/projects/acpins.jpg',
    // TODO (Saad): no custom domain was given for this one, so it still points
    // at the Vercel deployment. Swap it in if there is one.
    href: 'https://ac-pins.vercel.app/',
  },
  {
    slug: 'acpeds',
    stack: ['Next.js', 'Tailwind CSS', 'French'],
    category: 'Catalogue',
    title: 'ACPeds',
    description:
      'Catalogue for a large library of custom character models, split by category so an image-heavy collection stays quick to scan. Served in French.',
    image: '/projects/acpeds.jpg',
    href: 'https://peds.aczone.xyz/',
    captureUrl: 'https://ac-peds.vercel.app/',
  },
]

export const projectsSection = {
  eyebrow: 'Projects',
  heading: 'Built with structure, shipped with care.',
  intro:
    'Selected work showing how requirements turn into clear, maintainable software. From data model and architecture through to the interface people actually use.',
} as const

export const about = {
  eyebrow: 'About Me',
  /** Two lines, stacked, mirroring the reference's split headline. */
  headingLineOne: 'Turning spreadsheets',
  headingLineTwo: 'into software since 2023.',
  badge: 'Economics grad turned developer',
  paragraphs: [
    "I'm a full-stack developer based in Morocco, working across the MERN stack and Odoo/ERP development. My background is in economics, which means I tend to start with the workflow and the numbers behind a problem before I start writing code.",
    'That mix is the useful part. I read a business process, find where it actually breaks, and build something modular and maintainable around it, rather than shipping features that look right but fight the way people work.',
  ],
  focus: [
    {
      title: 'Technical focus',
      body: 'Custom Odoo modules, Docker environments, and interactive web applications built on modern frameworks.',
    },
    {
      title: 'Business edge',
      body: 'Economics training used to map workflows, spot inefficiency, and connect technical decisions to what the business needs.',
    },
    {
      title: 'Where this is going',
      body: 'Short term, shipping complete Odoo modules end to end. Longer term, working as an ERP consultant.',
    },
  ],
} as const

export interface SkillCard {
  title: string
  body: string
  tags: readonly string[]
  /** Key into the icon map in components/Skills.tsx. */
  icon: 'layout' | 'server' | 'workflow'
}

export const skillsSection = {
  eyebrow: 'Skills',
  heading: 'What I work with.',
  intro:
    'The tools I reach for most, and what I use each of them to do. Happy to work into an existing stack rather than insisting on my own.',
  cta: { label: 'Start a project', href: '#contact' },
  cards: [
    {
      icon: 'layout',
      title: 'Front-End',
      body: 'Responsive, accessible interfaces with careful attention to state, performance and the small interactions that make a product feel finished.',
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      icon: 'server',
      title: 'Back-End',
      body: 'REST APIs, authentication and data modelling, with an eye on where a schema will hurt six months from now.',
      tags: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
    },
    {
      icon: 'workflow',
      title: 'ERP & Odoo',
      body: 'Custom Odoo modules and integrations: translating a real business process into something the system can actually run.',
      tags: ['Odoo', 'Python', 'XML Views', 'ORM', 'Business Analysis'],
    },
  ] satisfies SkillCard[],
} as const

export interface FaqItem {
  question: string
  answer: string
}

export const faqSection = {
  eyebrow: 'FAQ',
  heading: 'Your questions, my answers.',
  intro: 'Common questions about how I work, what I build, and what a project looks like.',
  items: [
    {
      question: 'What kind of projects do you take on?',
      answer:
        'Web applications, internal tools and dashboards, and Odoo/ERP customisation. I am most useful where there is real business logic to untangle rather than a purely visual brief.',
    },
    {
      question: 'Can you work with an existing codebase?',
      answer:
        'Yes, and it is often the more interesting work. I start by reading the code and the data model before proposing changes, so the first thing you get is an honest assessment rather than a rewrite pitch.',
    },
    {
      question: 'How do we start?',
      answer:
        'Send a message through the form below with a short description of the problem. I will reply with questions, a rough approach, and an honest view of whether I am the right person for it.',
    },
    {
      question: 'What does your process look like?',
      answer:
        'Understand the workflow, agree on scope, then build in reviewable increments. You see working software early and often, which is the cheapest time to change direction.',
    },
    {
      question: 'How long does a project take?',
      answer:
        'A focused tool or site is usually a few weeks. ERP work depends almost entirely on how clear the underlying process is, so I scope that after the first conversation rather than guessing up front.',
    },
    {
      question: 'What do you need from me before we start?',
      answer:
        'A description of the process as it works today, including the awkward parts and manual workarounds. Access to whoever actually does the work daily is worth more than a written spec.',
    },
  ] satisfies FaqItem[],
} as const

export const contactSection = {
  eyebrow: 'Get in touch',
  heading: 'Ready when you are.',
  intro:
    "Have a project in mind, or a role you think fits? Send a message and I'll get back to you.",
  fields: {
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
  },
  submit: 'Submit',
  success: "Thanks, your message is on its way. I'll reply soon.",
} as const
