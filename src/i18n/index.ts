import { getRelativeLocaleUrl } from 'astro:i18n';
import { fr } from './fr';
import { en } from './en';
import { TEXT_PLACEHOLDERS } from '../config';

export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export type Alternates = Record<Lang, string>;

export const texts = { fr, en };

/** Adresse de chaque page fixe dans chaque langue (lien FR · EN, hreflang). */
export const routes = {
  home: { fr: getRelativeLocaleUrl('fr', ''), en: getRelativeLocaleUrl('en', '') },
  projects: {
    fr: getRelativeLocaleUrl('fr', 'projets'),
    en: getRelativeLocaleUrl('en', 'projects'),
  },
  legal: {
    fr: getRelativeLocaleUrl('fr', 'mentions-legales'),
    en: getRelativeLocaleUrl('en', 'legal'),
  },
  privacy: {
    fr: getRelativeLocaleUrl('fr', 'confidentialite'),
    en: getRelativeLocaleUrl('en', 'privacy'),
  },
} satisfies Record<string, Alternates>;

export type PageKey = keyof typeof routes;

/** Adresse de la fiche d'un projet. */
export const projectUrl = (lang: Lang, slug: string) =>
  `${routes.projects[lang]}${slug}/`;

/** Ancres des sections de l'accueil. */
export const anchors = {
  fr: { approach: 'approche', about: 'a-propos', projects: 'projets', contact: 'contact' },
  en: { approach: 'approach', about: 'about', projects: 'projects', contact: 'contact' },
} satisfies Record<Lang, Record<string, string>>;

const NBSP = ' ';
const NNBSP = ' ';

/** Espaces insécables de la typographie française (sans changer aucun mot). */
function typoFr(text: string): string {
  return text
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;!?])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NNBSP}`)
    .replace(/ »/g, `${NNBSP}»`)
    .replace(/(\d) (?=\d{3}\b)/g, `$1${NBSP}`)
    .replace(/(\d) (?=[%€\p{L}])/gu, `$1${NBSP}`)
    .replace(/≈ /g, `≈${NBSP}`)
    .replace(/ →/g, `${NBSP}→`);
}

/** Remplace les placeholders et applique la typographie. Renvoie du texte simple. */
export function plain(text: string, lang: Lang): string {
  let out = text;
  for (const [token, values] of Object.entries(TEXT_PLACEHOLDERS)) {
    out = out.split(token).join(values[lang]);
  }
  return lang === 'fr' ? typoFr(out) : out;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Comme `plain`, en HTML : ==mot== devient un mot surligné. À utiliser avec set:html. */
export function rich(text: string, lang: Lang): string {
  return escapeHtml(plain(text, lang)).replace(
    /==(.+?)==/g,
    '<span class="surligne">$1</span>',
  );
}

/** Surligne `part` à l'intérieur de `text` (résultat des projets). */
export function richHighlight(text: string, part: string, lang: Lang): string {
  const i = text.indexOf(part);
  if (i < 0) return rich(text, lang);
  return rich(`${text.slice(0, i)}==${part}==${text.slice(i + part.length)}`, lang);
}
