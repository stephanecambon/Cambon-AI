// English texts. Wrap a word in == to highlight it in amber (e.g. ==pay==).
import type { Texts } from './fr';

export const en: Texts = {
  meta: {
    homeTitle: 'Cambon AI · Applied R&D for small and mid-sized companies',
    homeDescription:
      'Cambon AI helps small and mid-sized companies solve their hardest problems: optimization, forecasting, targeting, decision support. From a well-framed problem to a solution running in production.',
    legalTitle: 'Legal notice · Cambon AI',
    legalDescription: 'Legal notice for the cambon.ai website.',
    notFoundTitle: 'Page not found · Cambon AI',
  },
  nav: {
    approach: 'Approach',
    projects: 'Projects',
    about: 'About',
    booking: 'Book a call',
    mainLabel: 'Main navigation',
    langLabel: 'Language',
  },
  hero: {
    eyebrow: 'Cambon AI · Applied R&D for small and mid-sized companies',
    title: 'Your hardest problems are the ones that ==pay== the most.',
    subtitle:
      'A researcher to frame the problem, an entrepreneur to turn it into value. With a PhD in AI and more than ten years as an entrepreneur, I tackle what weighs on your margins: optimization, forecasting, targeting, decision support. From a well-framed problem to a solution running in production.',
    ctaPrimary: "Let's talk about your problem",
    ctaSecondary: 'See the projects',
  },
  footer: {
    company: 'Cambon AI · SASU · Paris',
    legal: 'Legal notice',
  },
  legal: {
    eyebrow: 'Legal information',
    title: 'Legal notice',
    items: [
      ['Company', 'CAMBON AI, SASU (French simplified joint-stock company) with a share capital of €1,000'],
      ['Registered office', "126 rue d'Alésia, 75014 Paris, France"],
      ['Paris Trade and Companies Register (RCS)', '[NUMÉRO RCS À COMPLÉTER]'],
      ['Publication director', 'Stéphane Cambon'],
      ['Contact', 'stephane@cambon.ai'],
      ['Hosting provider', 'GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States'],
    ],
    privacy: 'This website sets no cookies and uses no audience measurement tools.',
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist or has been moved.',
    back: 'Back to the home page',
  },
};
