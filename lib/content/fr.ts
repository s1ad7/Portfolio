import type { Content } from './en'

/* ---------------------------------------------------------------------------
   French copy.

   Written as French, not translated word for word: the English leans on short
   declaratives that sound clipped in French, so several lines are restructured
   to keep the tone (direct, commercial, non-corporate) rather than the syntax.

   Typed as `Content`, so a missing key fails the build instead of silently
   rendering nothing.
--------------------------------------------------------------------------- */

export const fr = {
  meta: {
    role: 'Développeur Full-Stack',
    title: 'Saad Ifli, développeur full-stack, à distance',
    description:
      'Développeur full-stack basé au Maroc, disponible à distance partout dans le monde. Sites, boutiques en ligne et automatisations qui transforment vos visiteurs en clients. Next.js, WordPress, GSAP.',
    keywords: [
      'développeur web Maroc',
      'développeur web freelance',
      'développeur Next.js',
      'création site web Maroc',
      'site internet pour entreprise',
      'création boutique en ligne',
      'site de réservation en ligne',
      'automatisation entreprise',
      'développeur full-stack à distance',
      'développeur freelance télétravail',
    ],
    ogTagline: 'Des sites, des boutiques et des automatisations qui convertissent.',
    ogStats: ['30+ projets', 'International'],
  },

  nav: [
    { label: 'Projets', href: '#projects' },
    { label: 'À propos', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'FAQ', href: '#faq' },
  ],
  navCta: 'Contact',
  menu: { open: 'Ouvrir le menu', close: 'Fermer le menu' },
  backToTop: ', retour en haut',
  seeAllWork: 'Voir tous les projets',
  servicesNav: 'Services',
  worldwide: 'À distance, partout dans le monde',
  areasServed: 'Également',
  tagline: 'Pensé avec méthode, livré avec soin.',

  hero: {
    badge: 'Développeur Full-Stack · Maroc · Partout dans le monde',
    /* "Bonjour" not "Salut": the rest of the French copy addresses the
       visitor as "vous", and B2B French expects that register. "Salut" is the
       tutoiement greeting, so pairing it with vouvoiement everywhere else reads
       as a mismatch. "moi c'est Saad" keeps the warmth of the English without
       dropping into slang. */
    greeting: 'Bonjour,',
    headline: 'moi c’est Saad !',
    subline:
      'Je conçois des applications web claires et fiables, agréables à utiliser et faites pour durer.',
    portraitAlt: 'Saad Ifli à son bureau',
  },

  projectsSection: {
    eyebrow: 'Projets',
    heading: 'Pensé avec méthode, livré avec soin.',
    intro:
      'Une sélection de projets qui montre comment un besoin devient un produit clair et maintenable. Du modèle de données à l’architecture, jusqu’à l’interface que les gens utilisent vraiment.',
    loadMore: 'Voir plus',
    countAnnouncement: '{shown} projets affichés sur {total}.',
    visit: 'Voir le site',
    opensInNewTab: '(ouvre le site dans un nouvel onglet)',
  },

  projects: {
    everstead: {
      category: 'Site d’agence',
      description:
        'Site d’un studio digital, construit sur une identité presque noire, une typographie condensée très marquée et un seul accent doré. Il déroule au scroll un processus en six étapes, du cadrage jusqu’au lancement, puis une grille des secteurs pour lesquels ils travaillent.',
    },
    carently: {
      category: 'Plateforme de réservation',
      description:
        'Plateforme de location de voitures au Maroc. Le visiteur parcourt la flotte, consulte les véhicules mis en avant et les avis, puis réserve via un parcours guidé, avec une inscription distincte pour les partenaires qui proposent leurs propres véhicules.',
    },
    streamelite: {
      category: 'Site d’abonnement',
      description:
        'Site d’abonnement pour un service de streaming, en français. Navigateur de chaînes, offres par paliers, blog et FAQ, le tout orienté vers un seul objectif : faire souscrire le visiteur.',
    },
    marbio: {
      category: 'Site institutionnel',
      description:
        'Site institutionnel d’une société de bioproduction de vaccins : gouvernance, partenaires, services et production, sur une arborescence dense à plusieurs niveaux. Réalisé sous WordPress, en français.',
    },
    acscripts: {
      category: 'E-commerce',
      description:
        'Boutique pour un catalogue de logiciels premium : produits à l’unité, packs, demandes de développement sur mesure et espace client derrière une connexion.',
    },
    acpins: {
      category: 'E-commerce',
      description:
        'Boutique de cartes de jeu, recharges et abonnements au Maroc, en dirhams, avec livraison des codes par WhatsApp. Cartes cadeaux, pins, abonnements et clés de jeu.',
    },
    acpeds: {
      category: 'Catalogue',
      description:
        'Catalogue d’une large bibliothèque de personnages sur mesure, découpé par catégorie pour qu’une collection très visuelle reste rapide à parcourir. En français.',
    },
  },

  about: {
    eyebrow: 'À propos',
    headingLineOne: 'J’ai étudié ce qui fait gagner de l’argent',
    headingLineTwo: 'avant d’apprendre à créer des sites.',
    paragraphs: [
      'Cet ordre a tout changé. Je ne vends pas des pages. Je construis le chemin le plus court entre un inconnu et votre chiffre d’affaires, et chaque choix, sur ce site comme sur le vôtre, a une seule mission : amener la bonne personne à passer à l’action.',
      'C’est une habitude plus ancienne que mes projets clients : j’ai toujours pris des tâches lentes et manuelles pour les rendre numériques et rapides. Entreprise ou particulier, si un processus vous mange des heures, je préfère construire l’outil qui vous les rend.',
    ],
    cta: { label: 'Parlez-moi de votre projet', href: '#contact' },
    portraitAlt: 'Portrait de Saad Ifli',
    easterEgg: {
      trigger: 'ou regardez mon CV vidéo',
      dialogTitle: 'CV vidéo',
      close: 'Fermer',
      caption:
        'Ce n’est pas moi. Nightcrawler (2014), et toujours la candidature la plus motivée jamais filmée.',
    },
    statLabels: {
      delivered: 'projets livrés à l’international',
      featured: 'présentés ci-dessus, tous en ligne',
      years: 'ans à construire pour le web',
      lighthouse: 'meilleur score de performance Lighthouse',
    },
    remote: {
      title: 'Travailler avec moi à distance',
      items: [
        {
          label: 'Fuseau horaire',
          value: 'GMT+1',
          detail:
            'Les mêmes horaires que Paris, Madrid et Lisbonne, et mon après-midi couvre la matinée de la côte est américaine.',
        },
        {
          label: 'Langues',
          value: 'FR · EN · AR',
          detail: 'Les appels, les comptes rendus et le contenu du site, dans l’une des trois.',
        },
        {
          label: 'Méthode',
          value: 'Asynchrone',
          detail:
            'Un suivi écrit que vous lisez quand cela vous arrange, et des appels quand une décision l’exige vraiment.',
        },
        {
          label: 'Réponses',
          value: 'Sous 24h',
          detail: 'En jours ouvrés, et je vous préviens à l’avance de mes absences.',
        },
      ],
    },
    github: {
      contributions: 'contributions GitHub sur l’année écoulée',
      calendarLabel:
        'Calendrier de contributions GitHub : {total} contributions sur l’année écoulée',
    },
  },

  skillsSection: {
    eyebrow: 'Services',
    heading: 'Ce que je peux construire pour vous.',
    intro:
      'Trois façons de vous aider, et les outils derrière chacune. Je m’adapte volontiers à une stack existante plutôt que d’imposer la mienne.',
    cta: { label: 'Démarrer un projet', href: '#contact' },
    cards: [
      {
        icon: 'layout' as const,
        title: 'Des sites qui vendent',
        body: 'Sites vitrines et pages d’atterrissage où le design, la vitesse et le texte visent le même but : transformer les visiteurs en demandes.',
        tags: ['React', 'Next.js', 'WordPress', 'GSAP', 'SEO'],
      },
      {
        icon: 'cart' as const,
        title: 'Boutiques & réservations',
        body: 'Boutiques, abonnements et parcours de réservation jugés sur un seul chiffre : combien de personnes vont au bout du paiement.',
        tags: ['Stripe', 'Next.js', 'API WhatsApp', 'Multilingue'],
      },
      {
        icon: 'workflow' as const,
        title: 'Automatisation',
        body: 'La tâche qui vous prend une heure par jour devient un outil qui la fait en quelques secondes. Systèmes connectés, données synchronisées, plus de copier-coller.',
        tags: ['Node.js', 'Python', 'API REST', 'Odoo', 'Docker'],
      },
    ],
  },

  faqSection: {
    eyebrow: 'FAQ',
    heading: 'Vos questions, mes réponses.',
    intro: 'Ce que les clients veulent vraiment savoir avant d’écrire à un développeur.',
    items: [
      {
        question: 'Combien coûte un site web ?',
        answer:
          'Cela dépend de ce que le site doit faire, je ne vais donc pas inventer un prix unique. Après un premier échange, vous recevez un devis fixe par écrit, et c’est ce que vous payez : pas de surprise à l’heure, pas de facture qui gonfle. Si votre budget et le périmètre ne collent pas, je vous le dis dès cet échange, pas trois semaines plus tard.',
      },
      {
        question: 'À qui appartient le site une fois terminé ?',
        answer:
          'À vous. Le domaine, l’hébergement et le code sont à votre nom et sur vos comptes dès le premier jour, et vous recevez une passation complète au lancement. Si nos routes se séparent, vous ne perdez rien.',
      },
      {
        question: 'Que se passe-t-il après le lancement ?',
        answer:
          'Je ne disparais pas. Vous avez une prise en main, une période pour les corrections, et la possibilité d’un accompagnement continu pour les évolutions et les mises à jour. Quand cela a du sens, je construis le site pour que vous puissiez modifier vous-même le contenu courant.',
      },
      {
        question: 'Combien de temps prend un projet ?',
        answer:
          'Un site bien cadré est en ligne en quelques semaines. Les projets plus lourds dépendent du périmètre : le devis est donc accompagné d’une date, et vous avez de mes nouvelles à chaque étape, pas seulement à l’échéance.',
      },
      {
        question: 'De quoi avez-vous besoin de ma part pour commencer ?',
        answer:
          'Une idée claire de ce que vous vendez, à qui, et de ce que le visiteur doit faire. Si vous avez une charte, des photos ou un ancien site, apportez-les. Le reste, y compris les textes, on peut le construire ensemble.',
      },
      {
        question: 'Pouvez-vous refaire mon site existant ?',
        answer:
          'Oui, et c’est souvent le travail le plus intéressant. Je commence par lire ce qui existe avant de proposer des changements : la première chose que vous recevez est donc un avis honnête, pas un argumentaire pour tout refaire.',
      },
    ],
  },

  contactSection: {
    eyebrow: 'Contact',
    heading: 'Quand vous voulez.',
    intro:
      'Un projet en tête, ou un poste qui pourrait me correspondre ? Envoyez-moi un message et je vous réponds.',
    fields: { name: 'Votre nom', email: 'Votre e-mail', message: 'Votre message' },
    placeholders: {
      name: 'Sara Amrani',
      email: 'sara@entreprise.com',
      message: 'Votre message ici...',
    },
    submit: 'Envoyer',
    sending: 'Envoi…',
    sendAnother: 'Envoyer un autre message',
    success: 'Merci, votre message est parti. Je vous réponds vite.',
    successViaMail:
      'Votre application e-mail devrait s’ouvrir avec le message prêt. Appuyez sur envoyer et il me parvient.',
    errors: {
      name: 'Merci d’indiquer votre nom.',
      email: 'Merci d’indiquer votre e-mail.',
      emailInvalid: 'Cet e-mail ne semble pas valide.',
      message: 'Merci d’écrire un message.',
      messageShort: 'Un peu plus de détail m’aiderait.',
      generic: 'Une erreur est survenue. Écrivez-moi directement.',
      offline: 'Serveur injoignable. Écrivez-moi directement.',
    },
  },
} satisfies Content
