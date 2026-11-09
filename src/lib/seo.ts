// Données structurées Schema.org (JSON-LD) : aident Google à comprendre
// qui édite le site, ce que fait Cambon AI et comment les pages s'organisent.
import { texts, routes, projectUrl, plain, type Lang } from '../i18n';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../config';

const SITE = 'https://cambon.ai';
const abs = (path: string) => new URL(path, SITE).href;
const ORG_ID = `${SITE}/#organisation`;
const PERSON_ID = `${SITE}/#stephane-cambon`;
const WEBSITE_ID = `${SITE}/#site`;
const LOCALE = { fr: 'fr-FR', en: 'en-US' } as const;

/** Accueil : entreprise, fondateur et site. */
export function homeJsonLd(lang: Lang) {
  const t = texts[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ORG_ID,
        name: 'Cambon AI',
        legalName: 'CAMBON AI',
        url: abs(routes.home[lang]),
        logo: abs('/icon-512.png'),
        image: abs(`/og-${lang}.png`),
        description: t.meta.homeDescription,
        email: CONTACT_EMAIL,
        address: {
          '@type': 'PostalAddress',
          streetAddress: "126 rue d'Alésia",
          postalCode: '75014',
          addressLocality: 'Paris',
          addressCountry: 'FR',
        },
        areaServed: 'FR',
        identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: '131228074' },
        founder: { '@id': PERSON_ID },
        knowsAbout: [
          lang === 'fr' ? 'Intelligence artificielle' : 'Artificial intelligence',
          lang === 'fr' ? 'Optimisation' : 'Optimization',
          lang === 'fr' ? 'Prévision' : 'Forecasting',
          lang === 'fr' ? 'Aide à la décision' : 'Decision support',
          'Data science',
        ],
        sameAs: ['https://github.com/stephanecambon'],
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Stéphane Cambon',
        jobTitle: lang === 'fr' ? 'Fondateur, docteur en intelligence artificielle' : 'Founder, PhD in artificial intelligence',
        image: abs('/images/stephane-cambon.jpg'),
        worksFor: { '@id': ORG_ID },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Université Paul Sabatier' },
        sameAs: [LINKEDIN_URL, 'https://github.com/stephanecambon'],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE}/`,
        name: 'Cambon AI',
        inLanguage: [LOCALE.fr, LOCALE.en],
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

function breadcrumb(lang: Lang, items: Array<[string, string]>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: abs(path),
    })),
  };
}

/** Page Projets : fil d'Ariane et liste des projets. */
export function projectsJsonLd(lang: Lang, projets: Array<{ title: string; slug: string }>) {
  const t = texts[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb(lang, [
        ['Cambon AI', routes.home[lang]],
        [t.projects.title, routes.projects[lang]],
      ]),
      {
        '@type': 'ItemList',
        itemListElement: projets.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: plain(p.title, lang),
          url: abs(projectUrl(lang, p.slug)),
        })),
      },
    ],
  };
}

/** Fiche projet : fil d'Ariane et description du projet. */
export function projectJsonLd(
  lang: Lang,
  p: { title: string; summary: string; slug: string; imageUrl: string; keywords: string },
) {
  const t = texts[lang];
  const url = abs(projectUrl(lang, p.slug));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb(lang, [
        ['Cambon AI', routes.home[lang]],
        [t.projects.title, routes.projects[lang]],
        [plain(p.title, lang), projectUrl(lang, p.slug)],
      ]),
      {
        '@type': 'CreativeWork',
        '@id': `${url}#projet`,
        name: plain(p.title, lang),
        headline: plain(p.title, lang),
        description: plain(p.summary, lang),
        url,
        image: abs(p.imageUrl),
        inLanguage: LOCALE[lang],
        keywords: p.keywords,
        author: { '@type': 'Person', '@id': PERSON_ID, name: 'Stéphane Cambon' },
        publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'Cambon AI' },
      },
    ],
  };
}

/** Sérialisation sûre à placer dans <script type="application/ld+json">. */
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
