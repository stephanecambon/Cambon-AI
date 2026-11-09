// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cambon.ai',
  output: 'static',
  trailingSlash: 'always',

  // Langues : français à la racine (/), anglais sous /en/
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },

  // Polices Google, téléchargées au build et servies depuis cambon.ai
  // (aucune requête des visiteurs vers les serveurs de Google)
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Barlow Condensed',
      cssVariable: '--font-barlow-condensed',
      weights: ['600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial Narrow', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Barlow',
      cssVariable: '--font-barlow',
      weights: ['400', '500', '600', '700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
