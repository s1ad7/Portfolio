import type { Locale } from '../i18n'

/* ---------------------------------------------------------------------------
   Local landing pages.

   These exist to catch buying intent: someone typing "création site web
   Casablanca" is looking to hire, where someone reading a blog post is not.
   Local landing pages are the pages that convert for a service business, and
   the research is blunt about the condition attached: pages with genuinely
   distinct content rank around 3x better than the same template with the city
   name swapped. Swapped-name pages are doorway pages and Google treats them
   as such.

   So each city here is written around the business mix that city actually has,
   which is a real difference and not a cosmetic one:

     Casablanca  commerce and e-commerce, the country's business capital
     Rabat       institutions, corporates and professional practices
     Marrakech   tourism, hospitality and bookings, largely inbound and
                 multilingual

   The slug differs per locale on purpose. It is the strongest on-page keyword
   signal there is, and the French and English searches are different phrases,
   not translations of one phrase.
--------------------------------------------------------------------------- */

export interface LandingSection {
  heading: string
  body: string
}

export interface LandingCopy {
  /** Keyword-bearing URL segment. Differs per locale by design. */
  slug: string
  /** <title>, WITHOUT the name: the root layout appends "| Saad Ifli" via its
   *  title template, and repeating it here produced it twice. Kept short so
   *  Google does not truncate the result. */
  title: string
  description: string
  eyebrow: string
  h1: string
  intro: string
  /** The concrete promise, three bullets, above the fold. */
  highlights: string[]
  sections: LandingSection[]
  /** Answers scoped to this city, eligible for FAQ rich results. */
  faq: { question: string; answer: string }[]
  ctaHeading: string
  ctaBody: string
}

export interface LandingPage {
  /** Stable internal id, also the JSON-LD anchor. */
  id: string
  /**
   * 'city'    a place. Listed under areas served, areaServed is that city.
   * 'service' a capability, sold anywhere. areaServed is worldwide, and it
   *           must never appear in the areas list or it reads as a location.
   * 'offer'   the free audit. Linked on its own.
   *
   * Explicit rather than inferred: the schema and the footer both branch on it,
   * and guessing from the data is how a service ends up advertised as a city.
   */
  kind: 'city' | 'offer' | 'service'
  /** Populates areaServed in the schema and the visible service line. */
  city: string
  /** Wider area the city page also serves, for areaServed. */
  region: string
  copy: Record<Locale, LandingCopy>
}

export const landingPages: LandingPage[] = [
  {
    id: 'casablanca',
    kind: 'city',
    city: 'Casablanca',
    region: 'Casablanca-Settat',
    copy: {
      fr: {
        slug: 'creation-site-web-casablanca',
        title: 'Création de site web à Casablanca',
        description:
          'Développeur web à Casablanca. Sites vitrines, boutiques en ligne et automatisations pensés pour transformer vos visiteurs en clients. Devis fixe après un premier échange.',
        eyebrow: 'Casablanca',
        h1: 'Création de site web à Casablanca',
        intro:
          'Casablanca concentre la plus forte densité d’entreprises du pays, et donc la plus forte concurrence en ligne. Un site qui se contente d’exister n’y suffit pas : il faut qu’il vende. Je conçois des sites et des boutiques pour des entreprises casablancaises, avec un objectif chiffré défini avant la première maquette.',
        highlights: [
          'Devis fixe par écrit après un seul appel, sans facturation à l’heure',
          'Site livré à votre nom : domaine, hébergement et code sur vos comptes',
          'Français, arabe ou anglais, selon la clientèle que vous visez',
        ],
        sections: [
          {
            heading: 'Le commerce d’abord',
            body: 'La majorité des demandes qui viennent de Casablanca concernent la vente : une boutique en ligne, un catalogue produit, un tunnel de commande, ou un site vitrine qui doit générer des appels. Je construis autour du chiffre qui compte pour vous, le nombre de commandes ou de demandes reçues, et non autour du nombre de pages livrées.',
          },
          {
            heading: 'Paiement et livraison adaptés au marché marocain',
            body: 'Prix en dirhams, paiement à la livraison quand votre clientèle l’exige, commande par WhatsApp quand c’est le canal qu’elle utilise vraiment. J’ai déjà livré des boutiques fonctionnant exactement sur ce modèle, avec livraison des codes et suivi des commandes par WhatsApp.',
          },
          {
            heading: 'Visible sur les recherches locales',
            body: 'Un site rapide, structuré et correctement balisé est ce qui vous permet d’apparaître quand un client cherche votre service à Casablanca. La performance technique n’est pas un détail : elle conditionne à la fois votre référencement et le nombre de visiteurs qui restent.',
          },
        ],
        faq: [
          {
            question: 'Travaillez-vous avec des entreprises basées à Casablanca ?',
            answer:
              'Oui, et à distance dans tout le Maroc. Les échanges se font par appel ou visio, et je peux me déplacer sur Casablanca pour le lancement d’un projet important.',
          },
          {
            question: 'Combien coûte un site web à Casablanca ?',
            answer:
              'Cela dépend du périmètre : un site vitrine et une boutique complète ne demandent pas le même travail. Après un premier échange, vous recevez un devis fixe par écrit, et c’est ce que vous payez.',
          },
          {
            question: 'Pouvez-vous reprendre un site existant ?',
            answer:
              'Oui. Je commence par un audit honnête de ce qui existe, et je vous dis franchement si une refonte complète se justifie ou si quelques corrections suffisent.',
          },
        ],
        ctaHeading: 'Parlons de votre projet à Casablanca',
        ctaBody:
          'Décrivez-moi ce que vous vendez et à qui. Je vous réponds avec un avis honnête sur ce qui vous ferait gagner le plus, même si ce n’est pas un site neuf.',
      },
      en: {
        slug: 'web-developer-casablanca',
        title: 'Web Developer in Casablanca',
        description:
          'Web developer in Casablanca building websites, online stores and automations that turn visitors into customers. Fixed quote in writing after one call.',
        eyebrow: 'Casablanca',
        h1: 'Web developer in Casablanca',
        intro:
          'Casablanca has the highest concentration of businesses in Morocco, and the strongest online competition to match. A site that merely exists will not carry you there. I build sites and stores for Casablanca businesses around a number agreed before the first mockup.',
        highlights: [
          'Fixed quote in writing after one call, no hourly billing',
          'Everything in your name: domain, hosting and code on your accounts',
          'French, Arabic or English, depending on who you sell to',
        ],
        sections: [
          {
            heading: 'Commerce first',
            body: 'Most Casablanca enquiries are about selling: an online store, a product catalogue, a checkout flow, or a marketing site that has to generate calls. I build around the number that matters to you, orders or enquiries received, not the number of pages delivered.',
          },
          {
            heading: 'Payment and delivery that fit the Moroccan market',
            body: 'Prices in dirhams, cash on delivery where your customers expect it, WhatsApp ordering where that is the channel they actually use. I have shipped stores running exactly that way, with codes delivered and orders tracked over WhatsApp.',
          },
          {
            heading: 'Visible in local search',
            body: 'A fast, well-structured, properly marked-up site is what lets you appear when someone searches for your service in Casablanca. Technical performance is not a detail here: it drives both your ranking and how many visitors stay.',
          },
        ],
        faq: [
          {
            question: 'Do you work with businesses based in Casablanca?',
            answer:
              'Yes, and remotely across Morocco. We work by call or video, and I can come to you in Casablanca for the kickoff of a significant project.',
          },
          {
            question: 'How much does a website cost in Casablanca?',
            answer:
              'It depends on scope: a marketing site and a full store are not the same job. After one call you get a fixed quote in writing, and that is what you pay.',
          },
          {
            question: 'Can you take over an existing site?',
            answer:
              'Yes. I start with an honest audit of what is already there, and I will tell you plainly whether a rebuild is justified or a few fixes would do.',
          },
        ],
        ctaHeading: 'Tell me about your Casablanca project',
        ctaBody:
          'Describe what you sell and who buys it. You get an honest opinion on what would move the needle most, even if that is not a new website.',
      },
    },
  },
  {
    id: 'rabat',
    kind: 'city',
    city: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    copy: {
      fr: {
        slug: 'creation-site-web-rabat',
        title: 'Création de site web à Rabat',
        description:
          'Développeur web à Rabat pour institutions, cabinets et entreprises. Sites structurés, multilingues et accessibles, livrés avec un devis fixe.',
        eyebrow: 'Rabat',
        h1: 'Création de site web à Rabat',
        intro:
          'À Rabat, les projets ressemblent rarement à une simple vitrine. Ce sont des institutions, des cabinets et des entreprises qui doivent présenter une organisation, des services et des documents avec clarté et crédibilité. C’est un travail de structure autant que de design.',
        highlights: [
          'Arborescences profondes tenues lisibles, même avec beaucoup de contenu',
          'Sites multilingues, français et anglais gérés proprement',
          'Accessibilité prise au sérieux, pas ajoutée après coup',
        ],
        sections: [
          {
            heading: 'Structurer avant de décorer',
            body: 'Un site institutionnel échoue rarement par manque d’esthétique : il échoue parce que personne ne trouve ce qu’il cherche. Je commence par l’architecture de l’information, gouvernance, services, publications, contacts, puis je conçois par-dessus. J’ai livré ce type de site pour une société de bioproduction, sur une arborescence dense à plusieurs niveaux.',
          },
          {
            heading: 'Multilingue sans bricolage',
            body: 'Deux langues correctement implémentées, avec les bonnes balises hreflang et une URL par langue, plutôt qu’un plugin de traduction qui dégrade le référencement. Ce site même en est la démonstration : français et anglais, chacun sur sa propre adresse et prégénéré.',
          },
          {
            heading: 'Autonomie de vos équipes',
            body: 'Quand le contenu doit évoluer souvent, publications, actualités, appels d’offres, je construis le site pour que vos équipes le mettent à jour sans passer par moi. Vous ne dépendez pas d’un prestataire pour corriger une date.',
          },
        ],
        faq: [
          {
            question: 'Travaillez-vous avec des organisations à Rabat ?',
            answer:
              'Oui. Ce type de projet se pilote très bien à distance, avec des points réguliers, et je peux me déplacer pour les réunions de cadrage.',
          },
          {
            question: 'Gérez-vous les sites en plusieurs langues ?',
            answer:
              'Oui, avec une URL dédiée par langue et le balisage hreflang correspondant, ce qui est la méthode qui préserve le référencement des deux versions.',
          },
          {
            question: 'Pouvons-nous mettre à jour le contenu nous-mêmes ?',
            answer:
              'Oui, quand cela a du sens. Je vous remets le site avec une prise en main, et le contenu courant reste modifiable sans intervention technique.',
          },
        ],
        ctaHeading: 'Discutons de votre projet à Rabat',
        ctaBody:
          'Envoyez-moi le périmètre, même approximatif. Je reviens vers vous avec une lecture claire de ce que cela implique et d’un ordre de grandeur.',
      },
      en: {
        slug: 'web-developer-rabat',
        title: 'Web Developer in Rabat',
        description:
          'Web developer in Rabat for institutions, practices and companies. Structured, multilingual, accessible sites delivered on a fixed quote.',
        eyebrow: 'Rabat',
        h1: 'Web developer in Rabat',
        intro:
          'Rabat projects are rarely a simple brochure. They are institutions, practices and companies that need to present an organisation, its services and its documents with clarity and credibility. That is as much a structural job as a design one.',
        highlights: [
          'Deep site structures kept navigable, even with a lot of content',
          'Multilingual sites with French and English handled properly',
          'Accessibility treated seriously, not bolted on at the end',
        ],
        sections: [
          {
            heading: 'Structure before decoration',
            body: 'Institutional sites rarely fail on looks. They fail because nobody can find anything. I start with information architecture, governance, services, publications, contacts, and design on top of it. I have delivered exactly this for a vaccine bioproduction company across a deep multi-section structure.',
          },
          {
            heading: 'Multilingual done properly',
            body: 'Two languages implemented correctly, with real hreflang tags and one URL per language, rather than a translation plugin that quietly damages your ranking. This very site is the demonstration: French and English, each on its own address and prerendered.',
          },
          {
            heading: 'Your team stays independent',
            body: 'Where content changes often, publications, news, tenders, I build the site so your team updates it without me. You should never need a contractor to correct a date.',
          },
        ],
        faq: [
          {
            question: 'Do you work with organisations in Rabat?',
            answer:
              'Yes. This kind of project runs well remotely with regular checkpoints, and I can travel for scoping meetings.',
          },
          {
            question: 'Do you handle multilingual sites?',
            answer:
              'Yes, with a dedicated URL per language and matching hreflang markup, which is the approach that protects the ranking of both versions.',
          },
          {
            question: 'Can we update the content ourselves?',
            answer:
              'Yes, where it makes sense. You get a handover, and everyday content stays editable without technical help.',
          },
        ],
        ctaHeading: 'Tell me about your Rabat project',
        ctaBody:
          'Send the scope, even roughly. You get a clear read on what it involves and a realistic order of magnitude.',
      },
    },
  },
  {
    id: 'marrakech',
    kind: 'city',
    city: 'Marrakech',
    region: 'Marrakech-Safi',
    copy: {
      fr: {
        slug: 'creation-site-web-marrakech',
        title: 'Création de site web à Marrakech',
        description:
          'Développeur web à Marrakech pour riads, restaurants et activités touristiques. Sites de réservation multilingues, rapides sur mobile, orientés conversion.',
        eyebrow: 'Marrakech',
        h1: 'Création de site web à Marrakech',
        intro:
          'À Marrakech, votre client est souvent à l’étranger, sur son téléphone, et compare plusieurs options avant de réserver. Un site touristique se juge donc sur trois points : la vitesse sur mobile, la clarté des photos et des prix, et la simplicité de la réservation.',
        highlights: [
          'Réservation directe, pour réduire la commission versée aux plateformes',
          'Multilingue : français, anglais, et davantage si votre clientèle le demande',
          'Pensé mobile d’abord, y compris sur une connexion lente',
        ],
        sections: [
          {
            heading: 'Reprendre la main sur vos réservations',
            body: 'Chaque réservation passée par une plateforme vous coûte une commission. Un site de réservation directe ne remplace pas ces plateformes, il récupère les clients qui vous ont déjà trouvés et qui préfèrent réserver chez vous. C’est la marge la plus simple à reconquérir.',
          },
          {
            heading: 'Le mobile est la seule vraie contrainte',
            body: 'Vos visiteurs consultent depuis l’étranger, souvent en déplacement, parfois avec un réseau médiocre. Je construis pour cette réalité : images optimisées, chargement rapide, boutons atteignables au pouce. Ce site est mesuré à 100 sur 100 en performance, et j’applique exactement la même méthode à vos pages.',
          },
          {
            heading: 'Donner confiance à un client qui ne vous connaît pas',
            body: 'Photos réelles, prix lisibles, conditions d’annulation explicites, avis visibles. Un visiteur à 3 000 kilomètres décide en quelques secondes s’il vous fait confiance, et ce sont ces éléments qui font la différence, bien plus que l’animation d’accueil.',
          },
        ],
        faq: [
          {
            question: 'Faites-vous des sites de réservation pour riads et restaurants ?',
            answer:
              'Oui. J’ai déjà construit des plateformes de réservation, avec parcours guidé, mise en avant des offres et espace dédié aux partenaires.',
          },
          {
            question: 'Le site peut-il être en plusieurs langues ?',
            answer:
              'Oui, et c’est presque toujours nécessaire à Marrakech. Chaque langue a sa propre URL, ce qui permet d’être trouvé dans chaque langue.',
          },
          {
            question: 'Puis-je encaisser les paiements en ligne ?',
            answer:
              'Oui, par carte, ou en acompte avec le solde sur place si vous préférez. On choisit selon votre clientèle et vos contraintes.',
          },
        ],
        ctaHeading: 'Parlons de votre projet à Marrakech',
        ctaBody:
          'Dites-moi ce que vous proposez et d’où viennent vos clients. Je vous dis ce qui, concrètement, augmenterait vos réservations directes.',
      },
      en: {
        slug: 'web-developer-marrakech',
        title: 'Web Developer in Marrakech',
        description:
          'Web developer in Marrakech for riads, restaurants and tour operators. Multilingual direct-booking sites, fast on mobile, built to convert.',
        eyebrow: 'Marrakech',
        h1: 'Web developer in Marrakech',
        intro:
          'In Marrakech your customer is usually abroad, on a phone, comparing several options before booking. So a tourism site is judged on three things: speed on mobile, clarity of photos and prices, and how simple it is to book.',
        highlights: [
          'Direct booking, to cut the commission you hand to platforms',
          'Multilingual: French, English, and more if your guests need it',
          'Mobile first, including on a slow connection',
        ],
        sections: [
          {
            heading: 'Take your bookings back',
            body: 'Every booking made through a platform costs you commission. A direct-booking site does not replace those platforms, it recaptures the guests who already found you and would rather book with you. It is the easiest margin to win back.',
          },
          {
            heading: 'Mobile is the only real constraint',
            body: 'Your visitors browse from abroad, often on the move, sometimes on a poor connection. I build for that reality: optimised images, fast loads, buttons reachable with a thumb. This site measures 100 out of 100 on performance, and your pages get the same method.',
          },
          {
            heading: 'Earning trust from someone who has never met you',
            body: 'Real photos, readable prices, explicit cancellation terms, visible reviews. A visitor 3,000km away decides in seconds whether to trust you, and those are the things that decide it, far more than the animation on your homepage.',
          },
        ],
        faq: [
          {
            question: 'Do you build booking sites for riads and restaurants?',
            answer:
              'Yes. I have built booking platforms before, with a guided flow, featured listings and a separate area for partners.',
          },
          {
            question: 'Can the site be in several languages?',
            answer:
              'Yes, and in Marrakech it almost always needs to be. Each language gets its own URL, which is what lets you be found in each one.',
          },
          {
            question: 'Can I take payments online?',
            answer:
              'Yes, by card, or as a deposit with the balance on arrival if you prefer. We pick based on your guests and your constraints.',
          },
        ],
        ctaHeading: 'Tell me about your Marrakech project',
        ctaBody:
          'Tell me what you offer and where your guests come from. I will tell you what would actually increase your direct bookings.',
      },
    },
  },
  {
    /* Every service page is tied to work already shipped: the project cards sit
       further down the same page, so a visitor can check the claim. Nothing
       here advertises a capability with no live site behind it. */
    id: 'multilingual',
    kind: 'service',
    city: 'Worldwide',
    region: 'Worldwide',
    copy: {
      fr: {
        slug: 'site-web-multilingue',
        title: 'Création de site web multilingue (FR/EN)',
        description:
          'Sites bilingues et multilingues faits correctement : une URL par langue, balises hreflang, contenu réellement rédigé. Sans plugin qui casse votre référencement.',
        eyebrow: 'Multilingue',
        h1: 'Sites multilingues, faits correctement',
        intro:
          'La plupart des sites multilingues sont un plugin de traduction posé sur un site monolingue. Résultat : une seule URL pour toutes les langues, des balises manquantes, et un référencement qui ne fonctionne dans aucune. Un site réellement multilingue se construit autrement, dès le départ.',
        highlights: [
          'Une URL dédiée par langue, indexée séparément par Google',
          'Balises hreflang réciproques, la condition pour être trouvé dans chaque langue',
          'Traduction rédigée, pas générée automatiquement',
        ],
        sections: [
          {
            heading: 'Ce que coûtent les plugins de traduction',
            body: 'Quand toutes les langues partagent la même adresse, Google n en indexe qu une. Vous payez pour une traduction que personne ne trouvera en cherchant dans cette langue. C est la raison la plus fréquente pour laquelle un site bilingue ne rapporte rien.',
          },
          {
            heading: 'La méthode qui fonctionne',
            body: 'Une adresse par langue, des balises hreflang qui se répondent, un sitemap qui déclare les alternatives, et un contenu rédigé dans chaque langue. C est exactement ainsi que ce site est construit : français et anglais, chacun prégénéré sur sa propre adresse.',
          },
          {
            heading: 'Rédigé, pas traduit',
            body: 'Une phrase qui convainc en anglais tombe souvent à plat traduite littéralement en français. Je réécris les arguments dans la langue cible plutôt que de les transposer, parce que c est le texte qui vend, pas la grammaire.',
          },
        ],
        faq: [
          {
            question: 'Combien de langues pouvez-vous gérer ?',
            answer:
              'Deux dans la plupart des projets, français et anglais, et davantage si votre marché le justifie. La méthode reste la même : une URL par langue et le balisage correspondant.',
          },
          {
            question: 'Pouvez-vous rendre multilingue un site existant ?',
            answer:
              'Oui, et c est une demande fréquente, souvent pour réparer une version traduite par plugin qui n a jamais été référencée.',
          },
          {
            question: 'Rédigez-vous les traductions ?',
            answer:
              'Je rédige le français et l anglais. Pour d autres langues, je structure le site et j intègre le texte que vous fournissez.',
          },
        ],
        ctaHeading: 'Un projet multilingue ?',
        ctaBody:
          'Dites-moi vos langues et vos marchés. Je vous dis ce que cela implique et, si votre site actuel est mal configuré, ce qu il faudrait corriger.',
      },
      en: {
        slug: 'multilingual-website-developer',
        title: 'Multilingual Website Developer (FR/EN)',
        description:
          'Bilingual and multilingual sites done properly: one URL per language, real hreflang, written translation. No plugin that quietly breaks your ranking.',
        eyebrow: 'Multilingual',
        h1: 'Multilingual websites, done properly',
        intro:
          'Most multilingual sites are a translation plugin bolted onto a single-language site. One URL for every language, missing tags, and search visibility that works in neither. A genuinely multilingual site is built differently, from the start.',
        highlights: [
          'A dedicated URL per language, indexed separately by Google',
          'Reciprocal hreflang tags, the requirement for being found in each language',
          'Translation written, not machine-generated',
        ],
        sections: [
          {
            heading: 'What translation plugins cost you',
            body: 'When every language shares one address, Google indexes one of them. You pay for a translation nobody will find by searching in that language. It is the most common reason a bilingual site earns nothing.',
          },
          {
            heading: 'The approach that works',
            body: 'One address per language, hreflang tags that reference each other, a sitemap declaring the alternates, and content written in each language rather than word for word. That is exactly how this site is built: French and English, each prerendered on its own address.',
          },
          {
            heading: 'Written, not translated',
            body: 'A sentence that persuades in English often falls flat translated literally into French. I rewrite the argument in the target language instead of transposing it, because the copy is what sells, not the grammar.',
          },
        ],
        faq: [
          {
            question: 'How many languages can you handle?',
            answer:
              'Two on most projects, French and English, and more where your market justifies it. The method is the same either way: one URL per language with matching markup.',
          },
          {
            question: 'Can you make an existing site multilingual?',
            answer:
              'Yes, and it is a common request, usually to repair a plugin-translated version that never ranked.',
          },
          {
            question: 'Do you write the translations?',
            answer:
              'I write French and English. For other languages I structure the site and integrate the copy you supply.',
          },
        ],
        ctaHeading: 'Working across languages?',
        ctaBody:
          'Tell me your languages and markets. I will tell you what it involves, and if your current site is set up wrong, what needs fixing.',
      },
    },
  },
  {
    id: 'booking',
    kind: 'service',
    city: 'Worldwide',
    region: 'Worldwide',
    copy: {
      fr: {
        slug: 'site-de-reservation-en-ligne',
        title: 'Création de site de réservation en ligne',
        description:
          'Plateformes de réservation sur mesure : parcours guidé, disponibilités, paiement ou acompte, espace partenaire. Pour reprendre la main sur vos réservations.',
        eyebrow: 'Réservation',
        h1: 'Sites et plateformes de réservation',
        intro:
          'Une réservation qui passe par une plateforme vous coûte une commission, à chaque fois. Un site de réservation directe ne remplace pas ces plateformes : il récupère les clients qui vous ont déjà trouvés et qui préféreraient réserver chez vous.',
        highlights: [
          'Parcours de réservation guidé, pensé pour être terminé et pas abandonné',
          'Paiement intégral, acompte, ou paiement sur place selon votre activité',
          'Espace dédié aux partenaires quand vous gérez plusieurs prestataires',
        ],
        sections: [
          {
            heading: 'Le taux de complétion avant tout',
            body: 'Un formulaire de réservation se juge sur un seul chiffre : combien de personnes qui le commencent le terminent. Moins d étapes, aucune information demandée sans raison, une confirmation claire. C est le même travail que sur la plateforme de location de véhicules que j ai livrée, avec parcours guidé et mise en avant des offres.',
          },
          {
            heading: 'Plusieurs prestataires, un seul site',
            body: 'Si vous agrégez l offre de plusieurs partenaires, il faut deux parcours distincts : celui du client qui réserve, et celui du partenaire qui inscrit son offre. Les mélanger est la façon la plus sûre de perdre les deux.',
          },
          {
            heading: 'Mobile, parce que c est là que ça se joue',
            body: 'Vos clients réservent depuis leur téléphone, souvent en déplacement et parfois sur un réseau médiocre. Le site doit rester rapide dans ces conditions, sinon la réservation se termine ailleurs.',
          },
        ],
        faq: [
          {
            question: 'Pour quels secteurs travaillez-vous ?',
            answer:
              'Location, hébergement, restauration, prestations sur rendez-vous. Le mécanisme est proche : des disponibilités, un parcours, une confirmation.',
          },
          {
            question: 'Peut-on encaisser en ligne ?',
            answer:
              'Oui, en totalité ou en acompte, avec le solde sur place. On choisit selon votre clientèle et votre trésorerie.',
          },
          {
            question: 'Cela remplace-t-il les plateformes de réservation ?',
            answer:
              'Non, et je ne le conseillerais pas. L objectif est de récupérer la part de clients qui vous connaissent déjà, sans commission.',
          },
        ],
        ctaHeading: 'Un projet de réservation ?',
        ctaBody:
          'Décrivez ce que vous proposez et comment vos clients réservent aujourd hui. Je vous dis ce qui augmenterait vos réservations directes.',
      },
      en: {
        slug: 'booking-website-developer',
        title: 'Booking Website and Platform Developer',
        description:
          'Custom booking platforms: guided flow, availability, full payment or deposit, partner area. Built to win back the bookings you pay commission on.',
        eyebrow: 'Booking',
        h1: 'Booking websites and platforms',
        intro:
          'Every booking through a platform costs you commission, every time. A direct booking site does not replace those platforms. It recaptures the customers who already found you and would rather book with you.',
        highlights: [
          'A guided booking flow, built to be finished rather than abandoned',
          'Full payment, deposit, or pay on arrival, depending on your business',
          'A separate partner area when you list several providers',
        ],
        sections: [
          {
            heading: 'Completion rate above everything',
            body: 'A booking flow is judged on one number: how many people who start it finish it. Fewer steps, nothing asked without a reason, and a confirmation that is unmistakable. That is the same work as the vehicle rental platform I delivered, with a guided flow and featured listings.',
          },
          {
            heading: 'Several providers, one site',
            body: 'If you aggregate other providers you need two distinct journeys: the customer booking, and the partner listing. Merging them is the surest way to lose both.',
          },
          {
            heading: 'Mobile, because that is where it is decided',
            body: 'Your customers book from a phone, often travelling, sometimes on a poor connection. The site has to stay fast in those conditions or the booking finishes somewhere else.',
          },
        ],
        faq: [
          {
            question: 'Which sectors do you work with?',
            answer:
              'Rental, accommodation, restaurants, appointment-based services. The mechanics are close: availability, a flow, a confirmation.',
          },
          {
            question: 'Can I take payment online?',
            answer:
              'Yes, in full or as a deposit with the balance on arrival. We choose based on your customers and your cash flow.',
          },
          {
            question: 'Does this replace booking platforms?',
            answer:
              'No, and I would not advise it. The goal is recapturing the share of customers who already know you, without commission.',
          },
        ],
        ctaHeading: 'Building something with bookings?',
        ctaBody:
          'Describe what you offer and how customers book today. I will tell you what would actually raise your direct bookings.',
      },
    },
  },
  {
    id: 'speed',
    kind: 'service',
    city: 'Worldwide',
    region: 'Worldwide',
    copy: {
      fr: {
        slug: 'optimisation-vitesse-site-web',
        title: 'Optimisation de la vitesse d un site web',
        description:
          'Votre site est lent sur mobile et vous perdez des visiteurs. Diagnostic mesuré, corrections priorisées, et des chiffres avant et après.',
        eyebrow: 'Performance',
        h1: 'Votre site est lent. Cela vous coûte des clients.',
        intro:
          'La lenteur est le problème le plus coûteux d un site, et le plus facile à ignorer : sur votre ordinateur et votre connexion, tout paraît normal. Vos visiteurs, eux, sont sur un téléphone et un réseau moyen. Je mesure ce qu ils vivent réellement, puis je corrige dans l ordre de ce qui coûte le plus.',
        highlights: [
          'Mesures réelles sur mobile, pas une impression sur votre écran',
          'Corrections classées par gain, du plus rentable au cosmétique',
          'Chiffres avant et après, pour que le résultat soit vérifiable',
        ],
        sections: [
          {
            heading: 'Ce qui ralentit vraiment un site',
            body: 'Presque toujours les mêmes causes : des images bien plus lourdes que nécessaire, des scripts tiers qui bloquent l affichage, des polices mal chargées, et du contenu rendu en JavaScript alors qu il pouvait être servi tel quel. Le diagnostic est rapide, la correction est du travail.',
          },
          {
            heading: 'Vitesse et référencement sont le même problème',
            body: 'Google mesure l expérience réelle de vos visiteurs et s en sert pour vous classer. Un site lent est donc pénalisé deux fois : moins bien positionné, et abandonné par ceux qui arrivent malgré tout.',
          },
          {
            heading: 'Mesuré, pas affirmé',
            body: 'Ce site est à 100 sur 100 en performance sur ordinateur, et chaque projet livré est mesuré de la même manière. Vous recevez les chiffres, avant et après, plutôt qu une promesse.',
          },
        ],
        faq: [
          {
            question: 'Travaillez-vous sur WordPress, Shopify, Wix ?',
            answer:
              'Oui. Les causes de lenteur sont largement les mêmes d une plateforme à l autre, et les corrections sont adaptées à la vôtre.',
          },
          {
            question: 'Faut-il refaire le site ?',
            answer:
              'Rarement. La plupart des gains viennent de corrections ciblées. Si une refonte est réellement plus rentable, je vous le dis, mais ce n est pas le point de départ.',
          },
          {
            question: 'Comment savoir si mon site est concerné ?',
            answer:
              'Demandez l audit gratuit. Vous recevez les mesures et une liste priorisée, sans engagement.',
          },
        ],
        ctaHeading: 'Faites mesurer votre site',
        ctaBody:
          'Envoyez-moi l adresse de votre site. Je vous renvoie ce que vivent réellement vos visiteurs sur mobile, et ce qui vous ferait gagner le plus.',
      },
      en: {
        slug: 'website-speed-optimisation',
        title: 'Website Speed Optimisation',
        description:
          'Your site is slow on mobile and it is costing you visitors. Measured diagnosis, prioritised fixes, and before and after numbers.',
        eyebrow: 'Performance',
        h1: 'Your site is slow. That costs you customers.',
        intro:
          'Slowness is the most expensive problem a site can have and the easiest to miss, because on your machine and your connection everything looks fine. Your visitors are on a phone and an average network. I measure what they actually experience, then fix in order of what costs you most.',
        highlights: [
          'Real measurements on mobile, not an impression from your desktop',
          'Fixes ranked by payoff, from the most valuable down to the cosmetic',
          'Before and after numbers, so the result is verifiable',
        ],
        sections: [
          {
            heading: 'What actually slows a site down',
            body: 'Almost always the same causes: images far heavier than they need to be, third-party scripts blocking the render, fonts loaded badly, and content rendered in JavaScript when it could have been served as-is. Diagnosis is quick. Fixing it is work.',
          },
          {
            heading: 'Speed and ranking are the same problem',
            body: 'Google measures what your visitors actually experience and ranks you on it. A slow site is penalised twice: it places lower, and it is abandoned by the people who arrive anyway.',
          },
          {
            heading: 'Measured, not asserted',
            body: 'This site scores 100 out of 100 on desktop performance, and every project I deliver is measured the same way. You get the numbers, before and after, rather than a promise.',
          },
        ],
        faq: [
          {
            question: 'Do you work on WordPress, Shopify, Wix?',
            answer:
              'Yes. The causes of slowness are largely the same across platforms, and the fixes are adapted to yours.',
          },
          {
            question: 'Will the site need rebuilding?',
            answer:
              'Rarely. Most of the gain comes from targeted fixes. If a rebuild genuinely pays better I will say so, but it is not the starting point.',
          },
          {
            question: 'How do I know if this applies to my site?',
            answer:
              'Ask for the free audit. You get the measurements and a prioritised list, with nothing attached.',
          },
        ],
        ctaHeading: 'Have your site measured',
        ctaBody:
          'Send me your address. I will send back what your visitors actually experience on a phone, and what would gain you the most.',
      },
    },
  },
  {
    /* The lead magnet. Running a free audit on a prospect's site and naming
       the specific problems found is the single most effective outreach tactic
       in this market, and Saad already does the work for his own pages, so it
       costs him a measurement he can automate rather than a favour.

       It also gives cold outreach somewhere to land: a link to a real page
       beats a paragraph in a first email. */
    id: 'audit',
    kind: 'offer',
    city: 'Maroc',
    region: 'Maroc',
    copy: {
      fr: {
        slug: 'audit-gratuit-site-web',
        title: 'Audit gratuit de votre site web',
        description:
          'Recevez un audit gratuit de votre site : vitesse, mobile, référencement et conversion. Un rapport clair, sans jargon, et sans engagement.',
        eyebrow: 'Audit gratuit',
        h1: 'Votre site perd-il des clients ?',
        intro:
          'La plupart des sites perdent des visiteurs pour trois raisons mesurables : ils sont lents sur mobile, ils sont invisibles sur Google, ou ils ne disent jamais clairement quoi faire ensuite. Envoyez-moi votre adresse et je vous renvoie ce que j’ai trouvé, gratuitement.',
        highlights: [
          'Un rapport écrit et lisible, sans jargon technique',
          'Vitesse réelle sur mobile, mesurée et chiffrée',
          'Sans engagement : si tout va bien, je vous le dis aussi',
        ],
        sections: [
          {
            heading: 'Ce que je regarde',
            body: 'La vitesse de chargement sur un téléphone et sur une connexion moyenne, la structure technique qui détermine votre position sur Google, l’accessibilité, et le parcours du visiteur : est-ce qu’il comprend en cinq secondes ce que vous vendez et comment vous contacter.',
          },
          {
            heading: 'Ce que vous recevez',
            body: 'Une liste courte et priorisée, du problème qui vous coûte le plus au détail cosmétique. Chaque point est accompagné de ce que cela change concrètement pour vous, et non d’un score sorti d’un outil.',
          },
          {
            heading: 'Pourquoi c’est gratuit',
            body: 'Parce que c’est la façon la plus honnête de vous montrer comment je travaille. Vous repartez avec le rapport dans tous les cas, y compris si vous le faites corriger par quelqu’un d’autre.',
          },
        ],
        faq: [
          {
            question: 'C’est vraiment gratuit ?',
            answer:
              'Oui. Vous recevez le rapport sans contrepartie. Si vous souhaitez ensuite que je corrige les points identifiés, on en parle, mais rien ne vous y oblige.',
          },
          {
            question: 'Combien de temps faut-il pour le recevoir ?',
            answer:
              'Comptez deux jours ouvrés. Je préfère prendre le temps de regarder réellement le site plutôt que de vous renvoyer une capture d’écran d’un outil automatique.',
          },
          {
            question: 'Mon site est sur WordPress, Wix ou Shopify, est-ce un problème ?',
            answer:
              'Non. L’audit porte sur ce que vivent vos visiteurs, pas sur la technologie utilisée. Les recommandations sont adaptées à votre plateforme.',
          },
        ],
        ctaHeading: 'Demandez votre audit',
        ctaBody:
          'Indiquez l’adresse de votre site dans le message, et précisez ce qui vous inquiète le plus. Je vous réponds avec ce que j’ai trouvé.',
      },
      en: {
        slug: 'free-website-audit',
        title: 'Free Website Audit',
        description:
          'Get a free audit of your website: speed, mobile, search visibility and conversion. A clear report in plain language, no strings attached.',
        eyebrow: 'Free audit',
        h1: 'Is your website losing you customers?',
        intro:
          'Most sites lose visitors for three measurable reasons: they are slow on a phone, they are invisible on Google, or they never make the next step obvious. Send me your address and I will send back what I found, free.',
        highlights: [
          'A written report you can actually read, no jargon',
          'Real measured speed on a phone, with numbers',
          'No strings: if the site is fine, I will tell you that too',
        ],
        sections: [
          {
            heading: 'What I look at',
            body: 'Load speed on a phone over an average connection, the technical structure that decides where you sit on Google, accessibility, and the visitor journey: can someone tell in five seconds what you sell and how to reach you.',
          },
          {
            heading: 'What you get back',
            body: 'A short, prioritised list, from the problem costing you the most down to the cosmetic. Each point comes with what it actually changes for you, rather than a score copied out of a tool.',
          },
          {
            heading: 'Why it is free',
            body: 'Because it is the most honest way to show you how I work. You keep the report either way, including if you have someone else fix what it finds.',
          },
        ],
        faq: [
          {
            question: 'Is it really free?',
            answer:
              'Yes. You get the report with nothing attached. If you then want me to fix what it found, we can talk, but nothing obliges you to.',
          },
          {
            question: 'How long does it take?',
            answer:
              'Around two working days. I would rather actually look at the site than send you a screenshot from an automated tool.',
          },
          {
            question: 'My site is on WordPress, Wix or Shopify. Is that a problem?',
            answer:
              'No. The audit is about what your visitors experience, not the technology behind it. The recommendations are adapted to your platform.',
          },
        ],
        ctaHeading: 'Request your audit',
        ctaBody:
          'Put your site address in the message and tell me what worries you most. I will reply with what I found.',
      },
    },
  },
]

/** Capabilities, sold anywhere. Linked separately from the places. */
export const servicePages = landingPages.filter((page) => page.kind === 'service')

/** Only the real places, for the "areas served" list. */
export const cityPages = landingPages.filter((page) => page.kind === 'city')

/** The lead magnet, linked on its own rather than among the cities. */
export const offerPages = landingPages.filter((page) => page.kind === 'offer')

/** Resolves a locale's slug back to its page. */
export function findLandingPage(locale: Locale, slug: string): LandingPage | undefined {
  return landingPages.find((page) => page.copy[locale].slug === slug)
}