// Textes du site en français.
// Pour surligner un mot en ambre, entourez-le de == (ex. : ==rapportent==).

export const fr = {
  meta: {
    homeTitle: 'Cambon AI · R&D appliquée pour PME et ETI',
    homeDescription:
      "Cambon AI aide les PME et ETI à résoudre leurs problèmes difficiles : optimisation, prévision, ciblage, aide à la décision. Du problème formalisé à la solution en production.",
    legalTitle: 'Mentions légales · Cambon AI',
    legalDescription: 'Mentions légales du site cambon.ai.',
    notFoundTitle: 'Page introuvable · Cambon AI',
  },
  nav: {
    approach: 'Approche',
    projects: 'Projets',
    about: 'À propos',
    booking: 'Prendre rendez-vous',
    mainLabel: 'Navigation principale',
    langLabel: 'Langue',
  },
  hero: {
    eyebrow: 'Cambon AI · R&D appliquée pour PME et ETI',
    title: 'Vos problèmes difficiles sont ceux qui ==rapportent== le plus.',
    subtitle:
      "Un chercheur pour poser le problème, un entrepreneur pour en tirer de la valeur. Docteur en IA et entrepreneur depuis plus de dix ans, je m'attaque à ce qui pèse sur votre marge : optimisation, prévision, ciblage, aide à la décision. Du problème formalisé à la solution en production.",
    ctaPrimary: 'Parlons de votre problème',
    ctaSecondary: 'Voir les projets',
  },
  footer: {
    company: 'Cambon AI · SASU · Paris',
    legal: 'Mentions légales',
  },
  legal: {
    eyebrow: 'Informations légales',
    title: 'Mentions légales',
    items: [
      ['Dénomination', 'CAMBON AI, SASU au capital de 1 000 €'],
      ['Siège', "126 rue d'Alésia, 75014 Paris"],
      ['RCS Paris', '[NUMÉRO RCS À COMPLÉTER]'],
      ['Directeur de la publication', 'Stéphane Cambon'],
      ['Contact', 'stephane@cambon.ai'],
      ['Hébergeur', 'GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis'],
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
