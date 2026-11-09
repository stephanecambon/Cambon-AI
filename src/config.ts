// Réglages généraux du site — à modifier ici, ils s'appliquent partout.

/**
 * Lien vers la page de prise de rendez-vous (Calendly, Google Agenda, etc.).
 * Tant que la valeur commence par « [ », les boutons envoient vers un e-mail.
 */
export const BOOKING_URL = '[LIEN_PAGE_RESERVATION]';

export const CONTACT_EMAIL = 'stephane@cambon.ai';

/** Lien effectivement utilisé par les boutons « Prendre rendez-vous ». */
export const bookingHref = BOOKING_URL.startsWith('[')
  ? `mailto:${CONTACT_EMAIL}`
  : BOOKING_URL;
