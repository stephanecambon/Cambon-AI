// Textes du site en français (textes validés : ne pas reformuler).
// Pour surligner un mot en ambre, entourez-le de == (ex. : ==rapportent==).
// Un repère entre crochets éventuel est remplacé via src/config.ts.

export const fr = {
  meta: {
    homeTitle: 'Cambon AI · R&D appliquée pour PME et ETI',
    homeDescription:
      "Docteur en IA et entrepreneur, je m'attaque aux problèmes difficiles des PME et ETI : optimisation, prévision, ciblage, aide à la décision.",
    projectsTitle: 'Projets · Cambon AI, R&D appliquée',
    projectsDescription:
      "Appels d'offres, biotech, robotique, économie de la presse, logiciels SaaS : six projets, du problème formalisé au résultat mesuré.",
    legalTitle: 'Mentions légales · Cambon AI',
    privacyTitle: 'Confidentialité · Cambon AI',
    privacyDescription:
      'Données collectées par le site cambon.ai et sa newsletter, finalité, durée de conservation et vos droits.',
    legalDescription:
      'Mentions légales du site cambon.ai : éditeur CAMBON AI (SASU, Paris), immatriculation, directeur de la publication et hébergeur.',
    notFoundTitle: 'Page introuvable · Cambon AI',
    ogImageAlt: 'Cambon AI : Vos problèmes difficiles sont ceux qui rapportent le plus.',
  },
  nav: {
    approach: 'Approche',
    projects: 'Projets',
    about: 'À propos',
    booking: 'Prendre rendez-vous',
    mainLabel: 'Navigation principale',
    logoLabel: 'Cambon AI, accueil',
    langLabel: 'Langue',
  },

  // ---------- Page d'accueil ----------
  hero: {
    eyebrow: 'Cambon AI · R&D appliquée pour PME et ETI',
    title: 'Vos problèmes difficiles sont ceux qui ==rapportent== le plus.',
    subtitle:
      "Un chercheur pour poser le problème, un entrepreneur pour en tirer de la valeur. Docteur en IA et entrepreneur depuis plus de dix ans, je m'attaque à ce qui pèse sur votre marge : optimisation, prévision, ciblage, aide à la décision. Du problème formalisé à la solution en production.",
    ctaPrimary: 'Parlons de votre problème',
    ctaSecondary: 'Voir les projets',
    factsLabel: 'Fiche',
    facts: [
      ['Doctorat en IA', 'Planification sous contraintes, 2005'],
      ["11 ans d'entreprise", "Fondateur d'Ownpage, revendu en 2024"],
      ['≈ 40 % des grands médias', 'équipés par Ownpage en France'],
    ],
  },

  constat: {
    label: 'Le constat',
    title: "L'offre remonte.",
    paragraphs: [
      "Hier, optimiser des tournées ou prévoir finement sa demande demandait une équipe de R&D. Aujourd'hui, une PME peut s'y attaquer.",
      "Tout le marché monte d'un cran. Les fonctions support passent du logiciel aux agents IA, que les équipes apprennent à utiliser elles-mêmes. Le développement sur mesure devient plus rapide et moins cher. Et des problèmes autrefois réservés aux laboratoires et aux grands groupes deviennent accessibles.",
      "C'est là que je travaille : sur les problèmes qui font bouger la marge, les marchés et les produits.",
    ],
  },

  layers: {
    title: "Le marché de l'IA en trois couches",
    colExamples: 'Exemples de problèmes',
    colBefore: 'Avant',
    colNow: 'Maintenant',
    bar: 'Cambon AI',
    roi: 'Retour sur investissement',
    gainLabel: 'Gain :',
    rows: [
      {
        name: 'Couche 3 · Problèmes difficiles',
        gain: 'marge, nouveaux marchés, nouveaux produits',
        examples: [
          'optimiser des tournées, ordonnancer un atelier',
          'prévoir la demande, fixer les prix',
          'cibler : la bonne offre, au bon client, au bon moment',
          'anticiper les pannes (maintenance prédictive)',
          'robotiser un atelier, automatiser un labo',
        ],
        before: [
          {
            style: 'dashed',
            title: 'Hors de portée des PME',
            caption: 'Labos, cabinets spécialisés, R&D des grands groupes',
          },
        ],
        now: [
          {
            style: 'amber',
            title: 'Cambon AI',
            text: 'Formalisation du problème, prototype, résolution',
          },
          { style: 'outline', title: '↑ ESN', caption: 'commencent à monter' },
        ],
      },
      {
        name: 'Couche 2 · Problèmes de production',
        gain: 'productivité sur le cœur de métier',
        examples: [
          'mettre en place une data stack',
          'développer un logiciel métier sur mesure',
          'connecter les logiciels entre eux',
          "brancher l'IA sur la documentation interne : assistance, génération d'appels d'offres",
        ],
        before: [
          {
            style: 'outline',
            title: 'ESN',
            caption: 'Développement sur mesure, long et coûteux',
          },
        ],
        now: [
          {
            style: 'amber',
            title: 'Cambon AI conçoit et développe',
            text: "L'architecture des données, une IA documentaire fiable, etc.",
          },
          { style: 'outline', title: 'ESN', caption: 'développent, désormais à façon' },
        ],
      },
      {
        name: 'Couche 1 · Fonctions support',
        gain: 'productivité sur les coûts de structure',
        examples: [
          'relancer les clients, facturer',
          'trier les mails, rédiger les comptes rendus',
          'compta : saisir les factures, rapprocher la banque',
          'RH : suivre les congés, préparer la paie',
        ],
        before: [
          { style: 'outline', title: 'Éditeurs SaaS', caption: 'Un logiciel par fonction' },
        ],
        now: [
          {
            style: 'outline',
            title: 'Agents IA',
            text: 'Les outils grand public remplacent le SaaS',
            caption:
              'Mis en place par de petits intervenants, ou par les équipes elles-mêmes après une formation',
          },
        ],
      },
    ],
  },

  offer: {
    label: "L'offre",
    title: 'Ce que je fais',
    goalLabel: 'Objectif :',
    blocks: [
      {
        title: 'Problèmes difficiles',
        goal: 'de la marge, de nouveaux marchés, de nouveaux produits.',
        items: [
          'Optimiser des tournées, ordonnancer un atelier',
          'Prévoir la demande, fixer les prix',
          'Cibler la bonne offre, au bon client, au bon moment',
          'Anticiper les pannes',
          'Robotiser un atelier, automatiser un laboratoire de biotech',
          'Data science pour la biotech : choisir les prochaines expériences à partir des précédentes',
        ],
      },
      {
        title: 'Problèmes de production à forte composante R&D',
        goal: 'de la productivité sur votre cœur de métier.',
        items: [
          'Mettre en place une data stack et exploiter vos données (data science)',
          'Développer un logiciel métier sur mesure',
          'Connecter vos logiciels entre eux',
          "Brancher l'IA sur votre documentation interne : assistance, réponses aux appels d'offres",
          'Déployer des outils IA en environnement régulé',
        ],
      },
    ],
    notLead: 'Ce que je ne fais pas :',
    notText:
      "former vos équipes aux outils grand public, ni déployer des agents pour les fonctions support. D'autres le font très bien.",
  },

  method: {
    label: 'La méthode',
    title: 'Comment je travaille',
    steps: [
      {
        title: 'Cadrer.',
        text: "Un premier échange de 30 minutes, gratuit. Puis je formalise le problème et j'estime le retour sur investissement attendu, avant d'engager la réalisation. On décide ensemble d'y aller ou non.",
      },
      {
        title: 'Prototyper.',
        text: "Une preuve sur vos données, en quelques semaines. On mesure le ROI réel avant d'investir davantage.",
      },
      {
        title: 'Livrer.',
        text: 'Je développe la solution et la mets en production, ou je la transmets à vos équipes.',
      },
      {
        title: 'Déployer et aller sur le marché.',
        text: "Je fais adopter la solution par vos équipes. Et quand elle devient un nouveau produit, je construis avec vous le go-to-market : positionnement, prix, premiers clients. J'ai été entrepreneur pendant onze ans et j'ai vendu mes propres solutions : je sais ce qu'il faut pour qu'un produit trouve ses clients.",
      },
    ],
    note: 'Je peux aussi vous accompagner dans la durée, quelques jours par mois, comme Chief AI Officer à temps partagé.',
  },

  why: {
    label: 'La différence',
    title: 'Pourquoi moi',
    items: [
      {
        title: 'Chercheur.',
        text: "Je formalise le problème et je prouve que la solution tient. Docteur en IA, spécialiste de la planification sous contraintes, de l'optimisation, du machine learning, de la data science et des systèmes autonomes, j'applique ces méthodes partout où elles font la différence : aéronautique, santé, jeu vidéo, médias, logistique, biotech.",
      },
      {
        title: 'Entrepreneur.',
        text: "Je sais où se trouve le retour sur investissement, et je sais vendre ce qui en sort. J'ai vécu toutes les étapes d'une start-up : la fondation, les premiers clients, les levées de fonds et le financement non dilutif, le go-to-market, la relation client, la conduite des projets, jusqu'à la cession de la société et son intégration chez l'acquéreur.",
      },
      {
        title: 'Bâtisseur.',
        text: "Je développe et je livre, sans intermédiaire. Vingt ans d'expérience en développement logiciel et en création de produits : modèles d'IA, logiciels SaaS, clients lourds, systèmes embarqués, de la première maquette à la mise en production.",
      },
    ],
  },

  about: {
    label: 'Le parcours',
    title: 'Qui je suis',
    photoAlt: 'Stéphane Cambon',
    photoPlaceholder: 'Photo à venir',
    linkedin: 'Mon profil LinkedIn',
    email: "M'écrire un e-mail",
    lead: 'Stéphane Cambon, docteur en intelligence artificielle et entrepreneur.',
    paragraphs: [
      "J'ai fondé et dirigé Ownpage pendant onze ans. Nous avons construit, vendu et déployé un logiciel de personnalisation adopté par environ 40 % des grands médias français, puis l'entreprise a été revendue en 2024. J'ai ensuite été directeur des opérations chez Opper Marketing. Je continue à travailler sur l'économie de la presse : j'ai publié en open source un modèle de licence globale pour les éditeurs français.",
      "Avant cela, j'ai fait de la recherche. Ma thèse portait sur la planification sous contraintes multiples pour les systèmes autonomes (Université Paul Sabatier, 2005). J'ai ensuite confronté l'IA au terrain, dans des secteurs très différents : l'aéronautique, avec la maintenance prédictive sur Rafale et A320 ; la santé, avec un logiciel d'anesthésie à l'hôpital ; le jeu vidéo, avec l'intelligence artificielle du jeu de stratégie R.U.S.E.",
      "Je n'ai jamais lâché la recherche scientifique. Mon dernier travail démontre mathématiquement qu'un robot ne peut pas atteindre certains objets.",
    ],
  },

  projectsPreview: {
    label: 'Réalisations',
    title: 'Projets',
    all: 'Tous les projets',
  },

  cta: {
    label: 'Contact',
    title: 'Un problème qui résiste ?',
    text: 'Décrivez-le-moi en 30 minutes. Si je ne suis pas la bonne personne pour le résoudre, je vous le dirai.',
    button: 'Prendre rendez-vous',
  },

  // ---------- Projets ----------
  projects: {
    label: 'Réalisations',
    title: 'Projets',
    filterLegend: 'Filtrer par catégorie',
    filterAll: 'Tous',
    categories: {
      difficile: 'Problèmes difficiles',
      production: 'Production',
      saas: 'Logiciels SaaS',
    },
    cardProblem: 'Problème',
    cardApproach: 'Approche',
    cardResult: 'Résultat',
    context: 'Le contexte',
    problem: 'Le problème',
    approach: "L'approche",
    result: 'Le résultat',
    transferable: 'Ce qui est transposable',
    links: 'Liens',
    back: 'Tous les projets',
  },

  footer: {
    company: 'Cambon AI · SASU · Paris',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },

  // ---------- Newsletter ----------
  newsletter: {
    label: 'Newsletter',
    title: 'Recevez mes analyses.',
    text: "L'économie de la tech vue par la science. Pas de rythme imposé : seulement quand j'ai quelque chose d'utile à dire.",
    emailLabel: 'Votre e-mail',
    consent:
      "J'accepte de recevoir la newsletter de Cambon AI. Je peux me désinscrire à tout moment.",
    privacyLink: 'Politique de confidentialité',
    button: "S'abonner",
    sending: 'Envoi en cours…',
    success: "Merci, c'est noté. À bientôt dans votre boîte mail.",
    error: 'Une erreur est survenue. Écrivez-moi directement à stephane@cambon.ai.',
    errorEmail: 'Cette adresse e-mail ne semble pas valide.',
    errorConsent: 'Cochez la case pour confirmer votre inscription.',
    honeypot: 'Ne pas remplir ce champ',
    ctaLine: 'Pas encore de problème à me soumettre ?',
    ctaLink: 'Recevez mes analyses.',
  },

  // ---------- Confidentialité ----------
  privacy: {
    eyebrow: 'Données personnelles',
    title: 'Politique de confidentialité',
    intro:
      'Cette page explique quelles données le site cambon.ai et sa newsletter collectent, pourquoi, combien de temps, et comment exercer vos droits.',
    updated: 'Dernière mise à jour : novembre 2026.',
    sections: [
      {
        title: 'Responsable du traitement',
        paragraphs: [
          "CAMBON AI, SASU, 126 rue d'Alésia, 75014 Paris. Contact : stephane@cambon.ai.",
        ],
      },
      {
        title: 'Données collectées',
        paragraphs: [
          "Lorsque vous vous inscrivez à la newsletter : votre adresse e-mail, la date d'inscription, la langue et la page depuis laquelle vous vous êtes inscrit, ainsi que la version du texte de consentement que vous avez accepté. Rien d'autre : ni adresse IP, ni information sur votre navigateur.",
        ],
      },
      {
        title: 'Finalité',
        paragraphs: ["L'envoi de la newsletter de Cambon AI."],
      },
      {
        title: 'Base légale',
        paragraphs: [
          "Votre consentement, recueilli par une case à cocher au moment de l'inscription. Vous pouvez le retirer à tout moment.",
        ],
      },
      {
        title: 'Destinataire',
        paragraphs: [
          'Stéphane Cambon uniquement. Vos données ne sont ni vendues, ni louées, ni partagées.',
        ],
      },
      {
        title: 'Hébergement',
        paragraphs: [
          "Les inscriptions sont transmises à un script Google Apps Script et enregistrées dans un tableur Google Sheets privé, sur le compte Google Workspace de Cambon AI. Le prestataire est Google Cloud France SARL, 8 rue de Londres, 75009 Paris. Selon les conditions de Google, des transferts de données hors de l'Union européenne peuvent avoir lieu, encadrés par les garanties prévues dans ses conditions de traitement des données. Lors de l'envoi du formulaire, Google reçoit techniquement votre adresse IP ; Cambon AI ne l'enregistre pas.",
        ],
      },
      {
        title: 'Durée de conservation',
        paragraphs: [
          "Jusqu'à votre désinscription. Sans désinscription, vos données sont supprimées au plus tard trois ans après votre dernier contact avec moi (par exemple une réponse à un e-mail), conformément à la recommandation de la CNIL.",
        ],
      },
      {
        title: 'Vos droits',
        paragraphs: [
          "Vous pouvez à tout moment accéder à vos données, les rectifier, les faire effacer ou retirer votre consentement, par simple e-mail à stephane@cambon.ai. Chaque envoi de la newsletter rappelle comment se désinscrire.",
          "Vous pouvez aussi adresser une réclamation à la CNIL (www.cnil.fr).",
        ],
      },
      {
        title: 'Le site lui-même',
        paragraphs: [
          "Le site cambon.ai ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience. Ses polices de caractères sont servies depuis cambon.ai : votre navigateur ne contacte aucun autre site pendant la visite.",
          "Le site est hébergé par GitHub Pages (GitHub Inc.). Comme l'indique GitHub, l'adresse IP des visiteurs est enregistrée et conservée à des fins de sécurité, que le visiteur soit connecté à GitHub ou non.",
        ],
      },
    ],
  },
  legal: {
    eyebrow: 'Informations légales',
    title: 'Mentions légales',
    items: [
      ['Dénomination', 'CAMBON AI, SASU au capital de 1 000 €'],
      ['Siège', "126 rue d'Alésia, 75014 Paris"],
      ['Immatriculation', 'RCS Paris 131 228 074'],
      ['SIREN', '131 228 074'],
      ['Directeur de la publication', 'Stéphane Cambon'],
      ['Contact', 'stephane@cambon.ai'],
      [
        'Hébergeur',
        'GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis',
      ],
    ],
    privacy:
      "Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience.",
  },
  notFound: {
    title: 'Page introuvable',
    text: "Cette page n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
};

export type Texts = typeof fr;
export type LayerBox = {
  style: 'dashed' | 'outline' | 'amber';
  title: string;
  text?: string;
  caption?: string;
};
