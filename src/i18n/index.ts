import { getRelativeLocaleUrl } from 'astro:i18n';
import { fr } from './fr';
import { en } from './en';

export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const texts = { fr, en };

/** Adresse de chaque page dans chaque langue (sert au lien FR · EN et aux balises hreflang). */
export const routes = {
  home: { fr: getRelativeLocaleUrl('fr', ''), en: getRelativeLocaleUrl('en', '') },
  legal: {
    fr: getRelativeLocaleUrl('fr', 'mentions-legales'),
    en: getRelativeLocaleUrl('en', 'legal'),
  },
} satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof routes;

/** Ancres de la page d'accueil (sections à venir). */
export const anchors = {
  fr: { approach: 'approche', projects: 'projets', about: 'a-propos' },
  en: { approach: 'approach', projects: 'projects', about: 'about' },
} satisfies Record<Lang, Record<string, string>>;

/** Transforme ==mot== en mot surligné. Le reste du texte est échappé. */
export function highlight(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/==(.+?)==/g, '<span class="surligne">$1</span>');
}
