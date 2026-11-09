// ==========================================================
// Réglages et PLACEHOLDERS du site — tout ce qui reste à compléter est ici.
// Un texte peut contenir un repère entre crochets (ex. [MON_REPÈRE]) : il est
// remplacé à l'affichage par la valeur déclarée ci-dessous.
// ==========================================================

export const CONTACT_EMAIL = 'stephane@cambon.ai';

/** Profil LinkedIn de Stéphane (section « Qui je suis » et données structurées). */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/scambon/';

/**
 * Page de prise de rendez-vous (Google Agenda), utilisée par tous les boutons
 * « Prendre rendez-vous ». Si la valeur commence par « [ », les boutons ouvrent un e-mail.
 */
export const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ077Lo5LCnU8Abp1eBF3poi9wWsB1UedgkpfIk7Rc4dVRb1lSKt4hG6D7ZRgyD9mbeYm29RFVhL';

/**
 * Adresse de l'application web Google Apps Script qui enregistre les
 * inscriptions à la newsletter (voir tools/newsletter/README.md).
 * Si la valeur commence par « [ », le formulaire n'est pas affiché.
 */
export const NEWSLETTER_URL =
  'https://script.google.com/macros/s/AKfycbzJmJo0UCv28f6QQXlD-aLPmpbkFmjyT8LQYJt13lksvDrdDfk5ldHj9rwuQW75AIoFSg/exec';

/**
 * Version du texte de consentement de la newsletter. À changer (ex. v2-2027-01)
 * si le texte de la case à cocher change, et à ajouter dans CONSENT_VERSIONS
 * du script Apps Script.
 */
export const NEWSLETTER_CONSENT_VERSION = 'v1-2026-11';

/** Liens à compléter. Tant qu'une valeur commence par « [ », le lien n'est pas affiché. */
export const URL_PLACEHOLDERS: Record<string, string> = {
};

/** Textes provisoires, par langue. */
export const TEXT_PLACEHOLDERS: Record<string, { fr: string; en: string }> = {};

/**
 * Photo de la section « Qui je suis » : déposer le fichier à cet emplacement
 * (format portrait conseillé, 800 × 1000 px environ). Sans fichier, un cadre
 * « Photo à venir » s'affiche.
 */
export const PHOTO_PATH = 'images/stephane-cambon.jpg'; // dans le dossier public/

// ---------- Ne pas modifier en dessous ----------

export const bookingHref = BOOKING_URL.startsWith('[')
  ? `mailto:${CONTACT_EMAIL}`
  : BOOKING_URL;

export const newsletterEnabled = !NEWSLETTER_URL.startsWith('[');

/** Renvoie l'URL réelle d'un lien, ou null s'il n'est pas encore renseigné. */
export function resolveUrl(url: string): string | null {
  const value = URL_PLACEHOLDERS[url] ?? url;
  return value.startsWith('[') ? null : value;
}
