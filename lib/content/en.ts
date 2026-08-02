/* ---------------------------------------------------------------------------
   English copy. This file is the SHAPE OF TRUTH: the `Content` type is derived
   from it, and lib/content/fr.ts is checked against that type, so a missing or
   misspelled key in the translation is a compile error rather than a blank
   patch on the live site.

   Add a key here first, then in fr.ts.
--------------------------------------------------------------------------- */

/** Keys into the icon map in components/Skills.tsx. */
export type SkillIcon = 'layout' | 'cart' | 'workflow'

/* No `as const`: the Content type is derived from this object, and literal
   types here would mean the French copy could never satisfy it (a value of
   "Projets" is not assignable to the literal type "Projects"). Widened
   strings are exactly what a translation contract wants. */
export const en = {
  meta: {
    role: 'Full-Stack Developer',
    title: 'Saad Ifli, Full-Stack Developer, Remote Worldwide',
    description:
      'Full-stack developer based in Morocco, working remotely worldwide. Websites, online stores and automations that turn visitors into customers. Next.js, WordPress, GSAP.',
    keywords: [
      'web developer Morocco',
      'freelance web developer',
      'Next.js developer',
      'React developer Morocco',
      'website for small business',
      'e-commerce website developer',
      'booking website developer',
      'business automation developer',
      'remote full-stack developer',
      'hire freelance developer remote',
    ],
    /* Printed on the social share card. */
    ogTagline: 'Websites, stores and automations that turn visitors into customers.',
    ogStats: ['30+ projects', 'Worldwide'],
  },

  nav: [
    { label: 'Projects', href: '#projects' },
    { label: 'About Me', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'FAQ', href: '#faq' },
  ],
  navCta: 'Contact',
  menu: { open: 'Open menu', close: 'Close menu' },
  backToTop: ', back to top',
  work: {
    before: 'Before',
    after: 'After',
    caseStudy: 'Read the case study',
    compare: {
      label: 'Drag to compare the old design with the new site',
      hint: 'Drag the handle, or use the arrow keys.',
    },
  },
  seeAllWork: 'See all work',
  /* Reach first, cities second. The list used to read as the limit of
     where he works rather than as extra local pages. */
  servicesNav: 'Services',
  worldwide: 'Remote, worldwide',
  areasServed: 'Also serving',
  tagline: 'Built with structure, shipped with care.',

  hero: {
    /* Location, then reach. Morocco alone reads as a limit to a client
       abroad; the second half is what tells them they can hire him. */
    badge: 'Full-Stack Developer · Morocco · Working worldwide',
    /** Rendered as: "Hi," [portrait] "I'm Saad!" */
    greeting: 'Hi,',
    headline: "I'm Saad!",
    subline:
      'I build clean, dependable web applications that feel effortless to use and are built to last.',
    portraitAlt: 'Saad Ifli at his desk',
  },

  projectsSection: {
    eyebrow: 'Projects',
    heading: 'Built with structure, shipped with care.',
    intro:
      'Selected work showing how requirements turn into clear, maintainable software. From data model and architecture through to the interface people actually use.',
    loadMore: 'Load more',
    /* Announced to screen readers after Load more, so the change is not silent.
       A template rather than a function: the dictionary crosses the server to
       client boundary, and functions cannot be serialised into an RSC payload. */
    countAnnouncement: 'Showing {shown} of {total} projects.',
    visit: 'Visit site',
    opensInNewTab: '(opens the live site in a new tab)',
  },

  /** Keyed by project slug. Titles and URLs live in lib/site.ts. */
  projects: {
    everstead: {
      category: 'Agency Site',
      description:
        'Site for a digital studio, built on a near-black identity with heavy condensed display type and a single gold accent. Runs from a scroll-driven six-stage process, discovery through to launch, into a grid of the industries they build for.',
    },
    carently: {
      category: 'Booking Platform',
      description:
        'Car rental platform for Morocco. Visitors browse the fleet, see featured vehicles and reviews, and book through a guided flow, with a separate sign-up path for partners listing their own cars.',
    },
    streamelite: {
      category: 'Subscription Site',
      description:
        'Subscription site for a streaming service, served in French. Channel browser, tiered pricing, blog and FAQ, all pointed at getting a visitor onto a plan.',
    },
    marbio: {
      category: 'Corporate Site',
      description:
        'Corporate site for a vaccine bioproduction company, covering governance, partners, services and production across a deep multi-section structure. Built on WordPress, in French.',
    },
    acscripts: {
      category: 'E-commerce',
      description:
        'Storefront for a premium software catalogue, covering individual products, bundles, custom-work enquiries and customer accounts behind a login.',
    },
    acpins: {
      category: 'E-commerce',
      description:
        'Storefront for digital game cards, top-ups and subscriptions in Morocco, priced in dirhams with codes delivered over WhatsApp. Spans gift cards, pins, subscriptions and game keys.',
    },
    acpeds: {
      category: 'Catalogue',
      description:
        'Catalogue for a large library of custom character models, split by category so an image-heavy collection stays quick to scan. Served in French.',
    },
  },

  about: {
    eyebrow: 'About Me',
    headingLineOne: 'I studied why businesses make money',
    headingLineTwo: 'before I learned to build websites.',
    paragraphs: [
      'That order changed everything. I do not sell pages. I build the shortest path between a stranger and your revenue, and every choice on this site and on yours has one job: getting the right person to act.',
      'The habit is older than my client work: I have always taken slow, manual tasks and made them digital and fast. Business or individual, if a process eats your hours, I would rather build the tool that gives them back.',
    ],
    cta: { label: 'Tell me about your project', href: '#contact' },
    portraitAlt: 'Portrait of Saad Ifli',
    /* Deadpan on purpose: the surprise is the joke, and anyone who does not
       click loses nothing. */
    easterEgg: {
      trigger: 'or watch my video résumé',
      dialogTitle: 'Video résumé',
      close: 'Close',
      /* Shown under the player, the only place the joke is admitted. */
      caption: 'Not actually me. Nightcrawler (2014), and still the most committed job application ever filmed.',
    },
    /**
     * Labels only. The VALUES live in lib/content/index.ts because they are
     * facts, not copy: translating a number would let the two languages claim
     * different things.
     */
    statLabels: {
      delivered: 'projects delivered worldwide',
      featured: 'featured above, every one live',
      years: 'years building for the web',
      lighthouse: 'top Lighthouse performance score',
    },
    /* What a remote client screens for before they even look at the work:
       can we talk during my day, in my language, without chasing him. The site
       said none of it. */
    remote: {
      title: 'Working with me remotely',
      items: [
        {
          label: 'Time zone',
          value: 'GMT+1',
          detail:
            'The same working day as Paris, Madrid and Lisbon, and my afternoon covers the US East Coast morning.',
        },
        {
          label: 'Languages',
          value: 'FR · EN · AR',
          detail: 'Calls, written updates and the site copy itself, in any of the three.',
        },
        {
          label: 'How we work',
          value: 'Async by default',
          detail:
            'Written progress you can read when it suits you, calls when a decision actually needs one.',
        },
        {
          label: 'Replies',
          value: 'Within 24h',
          detail: 'On working days, and I tell you in advance when I will be away.',
        },
      ],
    },
    github: {
      contributions: 'GitHub contributions in the last year',
      calendarLabel: 'GitHub contribution calendar: {total} contributions in the last year',
    },
  },

  skillsSection: {
    eyebrow: 'Services',
    heading: 'What I can build for you.',
    intro:
      'Three ways I can help, and the tools behind each. Happy to work into an existing stack rather than insisting on my own.',
    cta: { label: 'Start a project', href: '#contact' },
    cards: [
      {
        icon: 'layout' as SkillIcon,
        title: 'Websites that sell',
        body: 'Marketing sites and landing pages where design, speed and copy all point at one goal: turning visitors into enquiries.',
        tags: ['React', 'Next.js', 'WordPress', 'GSAP', 'SEO'],
      },
      {
        icon: 'cart' as SkillIcon,
        title: 'Stores & bookings',
        body: 'Shops, subscriptions and booking flows measured by one number: how many people finish checkout.',
        tags: ['Stripe', 'Next.js', 'WhatsApp API', 'Multilingual'],
      },
      {
        icon: 'workflow' as SkillIcon,
        title: 'Automation',
        body: 'The task that eats an hour of your day becomes a tool that does it in seconds. Connected systems, synced data, no copy-pasting.',
        tags: ['Node.js', 'Python', 'REST APIs', 'Odoo', 'Docker'],
      },
    ],
  },

  processSection: {
    eyebrow: 'How I work',
    heading: 'Five steps, no surprises.',
    intro:
      'The same sequence on every project. You always know which step we are on and what comes next.',
    steps: [
      {
        title: 'Understand the numbers',
        body: 'Before anything is designed, we agree what the site has to achieve. What one new client is worth to you decides how much gets built, and what can wait.',
      },
      {
        title: 'A fixed quote, in writing',
        body: 'One call, then a written price and a date. No hourly billing and no invoice creep. If your budget and the scope do not fit, you hear that on the call, not three weeks in.',
      },
      {
        title: 'Structure before decoration',
        body: 'What goes where, and what a visitor has to find within five seconds. Design sits on top of that decision rather than replacing it.',
      },
      {
        title: 'Build, then measure',
        body: 'Tested on a real phone on an average connection, not only on my machine. You get the performance numbers before and after, because a claim you cannot check is worth nothing.',
      },
      {
        title: 'Handover, in your name',
        body: 'Domain, hosting and code on your accounts from the first day, a walkthrough, and a window for fixes. You are never locked to me.',
      },
    ],
  },

  testimonialsSection: {
    eyebrow: 'Clients',
    heading: 'What they said afterwards.',
    seeTheWork: 'See the work',
  },

  faqSection: {
    eyebrow: 'FAQ',
    heading: 'Your questions, my answers.',
    intro: 'The things clients actually want to know before they write to a developer.',
    items: [
      {
        question: 'How much does a website cost?',
        answer:
          'It depends on what the site has to do, so I will not pretend there is one number. After one call you get a fixed quote in writing, and that is what you pay: no hourly surprises, no invoice creep. If your budget and the scope do not fit, I will tell you on that call, not three weeks in.',
      },
      {
        question: 'Who owns the site when it is done?',
        answer:
          'You do. Domain, hosting and code sit in your accounts and your name from day one, and you get a full handover at launch. If we ever part ways, you lose nothing.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'I do not vanish. You get a walkthrough, a window for fixes, and the option of ongoing help with changes and updates. Where it makes sense, I build the site so you can edit the everyday content yourself.',
      },
      {
        question: 'How long does a project take?',
        answer:
          'A focused site is usually live in a few weeks. Bigger builds depend on scope, so the quote comes with a date, and you hear from me at every step rather than at the deadline.',
      },
      {
        question: 'What do you need from me to start?',
        answer:
          'A clear picture of what you sell, who buys it, and what you want a visitor to do. If you have brand assets, photos or an old site, bring them. Everything else, including the copy, we can work out together.',
      },
      {
        /* Disclosed proactively and deliberately. Research on freelance work
           found clients want AI use stated upfront, and treat discovering it
           later as the bigger breach of trust. The answer leads with judgment
           rather than with the tool, because "I use AI" on its own is a
           commodity claim that invites the question of why they are paying at
           all. */
        question: 'Do you use AI to build my site?',
        answer:
          'Yes, openly, and I would be wary of anyone claiming otherwise in 2026. It writes the repetitive parts faster than I can type them. What it does not do is decide what to build, notice the thing that will break in six months, or answer to you when something goes wrong. I learned this work before those tools existed, which is exactly why I can tell when their output is wrong. You are paying for that judgment, not for typing speed.',
      },
      {
        question: 'Can you redesign my existing site?',
        answer:
          'Yes, and it is often the more interesting work. I start by reading what is already there before proposing changes, so the first thing you get is an honest assessment rather than a rewrite pitch.',
      },
    ],
  },

  contactSection: {
    eyebrow: 'Get in touch',
    heading: 'Ready when you are.',
    intro:
      "Have a project in mind, or a role you think fits? Send a message and I'll get back to you.",
    fields: { name: 'Your name', email: 'Your email', message: 'Your message' },
    placeholders: {
      name: 'Sara Amrani',
      email: 'sara@company.com',
      message: 'Your message goes here...',
    },
    submit: 'Submit',
    sending: 'Sending…',
    sendAnother: 'Send another',
    success: "Thanks, your message is on its way. I'll reply soon.",
    /* Shown when the server has no email provider configured and the message was
       handed to the visitor's own mail client instead. It must not claim the
       message was sent: at this point it has only been drafted. */
    successViaMail:
      'Your email app should be open with the message ready. Press send and it reaches me.',
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter your email.',
      emailInvalid: 'That email does not look right.',
      message: 'Please enter a message.',
      messageShort: 'A little more detail would help.',
      generic: 'Something went wrong. Please email me directly.',
      offline: 'Could not reach the server. Please email me directly.',
    },
  },
}

/** Derived from the English copy, so the translation cannot drift from it. */
export type Content = typeof en
