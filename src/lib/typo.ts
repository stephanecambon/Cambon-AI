// Espaces insécables de la typographie française (sans changer aucun mot).
// Utilisé pour les textes de l'interface (i18n) ; appliqué aussi au texte des articles du blog à leur intégration.

const NBSP = ' ';
const NNBSP = ' ';

/** Espaces insécables de la typographie française (sans changer aucun mot). */
export function typoFr(text: string): string {
  return text
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;!?])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NNBSP}`)
    .replace(/ »/g, `${NNBSP}»`)
    .replace(/(\d) (?=\d{3}\b)/g, `$1${NBSP}`)
    .replace(/(\d) (?=[%€\p{L}])/gu, `$1${NBSP}`)
    .replace(/≈ /g, `≈${NBSP}`)
    .replace(/ →/g, `${NBSP}→`)
    // « à » ne reste jamais seul en fin de ligne
    .replace(/(^|[\s=])([àÀ]) /g, `$1$2${NBSP}`);
}
