// Tableau de bord privé (/admin/, en local uniquement) : lecture des deux
// scripts Google avec leur clé de lecture, puis calcul des statistiques.
// Les clés sont dans le fichier .env de l'ordinateur de travail, jamais dans le dépôt.

import { AUDIENCE_URL, NEWSLETTER_URL } from '../config';

const FUSEAU = 'Europe/Paris';
const jourParis = (d: Date) =>
  new Intl.DateTimeFormat('fr-CA', { timeZone: FUSEAU, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);

export type Ligne = { libelle: string; valeur: number; detail?: string };

async function lire(url: string, cle: string | undefined, jours?: number) {
  if (!url || url.startsWith('[')) return { erreur: "Le script n'est pas configuré dans src/config.ts." };
  if (!cle) return { erreur: 'Clé de lecture absente du fichier .env (voir le mode d’emploi de /admin/).' };
  const u = new URL(url);
  u.searchParams.set('format', 'stats');
  u.searchParams.set('cle', cle);
  if (jours) u.searchParams.set('jours', String(jours));
  try {
    const r = await fetch(u, { redirect: 'follow' });
    const data = await r.json();
    if (!data.ok) return { erreur: 'Le script a refusé la lecture : clé incorrecte, ou script pas encore mis à jour.' };
    return { data };
  } catch {
    return { erreur: 'Script injoignable (connexion, ou script pas encore mis à jour).' };
  }
}

const compter = (valeurs: string[]): Ligne[] => {
  const m = new Map<string, number>();
  valeurs.forEach((v) => m.set(v || '(aucune)', (m.get(v || '(aucune)') ?? 0) + 1));
  return [...m.entries()].map(([libelle, valeur]) => ({ libelle, valeur })).sort((a, b) => b.valeur - a.valeur);
};

const mediane = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return Math.round(s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2);
};

/** Une série par jour, jours sans visite compris. */
function parJour(dates: string[], jours: number): Ligne[] {
  const m = new Map<string, number>();
  dates.forEach((d) => m.set(d, (m.get(d) ?? 0) + 1));
  const out: Ligne[] = [];
  for (let i = jours - 1; i >= 0; i--) {
    const j = jourParis(new Date(Date.now() - i * 86400000));
    out.push({ libelle: j, valeur: m.get(j) ?? 0 });
  }
  return out;
}

export type StatsAudience = ReturnType<typeof statsAudience>;

function statsAudience(evenements: unknown[][], jours: number) {
  const depuis = Date.now() - jours * 86400000;
  const ev = evenements
    .map((r) => ({
      t: new Date(String(r[0])),
      type: String(r[1]),
      visite: String(r[2] || r[3]),
      vue: String(r[3]),
      page: String(r[4]),
      langue: String(r[5]),
      provenance: String(r[6]),
      utmSource: String(r[8] ?? ''),
      utmCampagne: String(r[10] ?? ''),
      appareil: String(r[11]),
      duree: Number(r[12]),
    }))
    .filter((e) => e.t.getTime() >= depuis)
    .sort((a, b) => a.t.getTime() - b.t.getTime());

  const vues = ev.filter((e) => e.type === 'vue');
  // Une visite = son premier événement « vue ».
  const visites = new Map<string, (typeof vues)[number]>();
  vues.forEach((v) => !visites.has(v.visite) && visites.set(v.visite, v));
  // Durée : plus grand « fin » de chaque vue, additionné par visite.
  const parVue = new Map<string, { visite: string; s: number }>();
  ev.filter((e) => e.type === 'fin' && Number.isFinite(e.duree)).forEach((f) => {
    const p = parVue.get(f.vue);
    if (!p || f.duree > p.s) parVue.set(f.vue, { visite: f.visite, s: f.duree });
  });
  const dureeVisite = new Map<string, number>();
  parVue.forEach(({ visite, s }) => dureeVisite.set(visite, (dureeVisite.get(visite) ?? 0) + s));

  const liste = [...visites.values()];
  const source = (v: (typeof liste)[number]) => v.utmSource || v.provenance;
  const durees = liste.map((v) => dureeVisite.get(v.visite) ?? 0);
  const mobiles = liste.filter((v) => v.appareil === 'mobile').length;

  const dureesParSource = new Map<string, number[]>();
  liste.forEach((v) => {
    const k = source(v) || '(aucune)';
    dureesParSource.set(k, [...(dureesParSource.get(k) ?? []), dureeVisite.get(v.visite) ?? 0]);
  });

  return {
    jours,
    visites: liste.length,
    pagesVues: vues.length,
    pagesParVisite: liste.length ? Math.round((vues.length / liste.length) * 10) / 10 : 0,
    dureeMediane: mediane(durees),
    partMobile: liste.length ? Math.round((mobiles / liste.length) * 100) : 0,
    parJour: parJour(liste.map((v) => jourParis(v.t)), jours),
    sources: compter(liste.map(source)).map((l) => ({
      ...l,
      detail: `médiane ${mediane(dureesParSource.get(l.libelle) ?? [])} s`,
    })),
    provenances: compter(liste.map((v) => v.provenance)),
    campagnes: compter(liste.filter((v) => v.utmSource).map((v) => `${v.utmSource} · ${v.utmCampagne || '(aucune)'}`)),
    pages: compter(vues.map((v) => v.page)),
    appareils: compter(liste.map((v) => v.appareil)),
    langues: compter(liste.map((v) => v.langue)),
  };
}

export type StatsNewsletter = ReturnType<typeof statsNewsletter>;

function statsNewsletter(inscriptions: { date: string; langue: string; page: string }[], jours: number) {
  const depuis = Date.now() - jours * 86400000;
  const dans = inscriptions.filter((i) => new Date(i.date).getTime() >= depuis);
  const derniere = inscriptions.map((i) => i.date).sort().at(-1);
  return {
    jours,
    total: inscriptions.length,
    periode: dans.length,
    derniere: derniere ? jourParis(new Date(derniere)) : '',
    parJour: parJour(dans.map((i) => jourParis(new Date(i.date))), jours),
    langues: compter(dans.map((i) => i.langue)),
    pages: compter(dans.map((i) => i.page)),
  };
}

export const PERIODES = [7, 30, 90] as const;

export async function chargerTableauDeBord() {
  const env = import.meta.env;
  const [aud, nl] = await Promise.all([
    lire(AUDIENCE_URL, env.AUDIENCE_CLE_LECTURE, Math.max(...PERIODES)),
    lire(NEWSLETTER_URL, env.NEWSLETTER_CLE_LECTURE),
  ]);
  return {
    audience: aud.erreur
      ? { erreur: aud.erreur }
      : { parPeriode: PERIODES.map((j) => statsAudience(aud.data.evenements ?? [], j)) },
    newsletter: nl.erreur
      ? { erreur: nl.erreur }
      : { parPeriode: PERIODES.map((j) => statsNewsletter(nl.data.inscriptions ?? [], j)) },
    misAJour: new Intl.DateTimeFormat('fr-FR', { timeZone: FUSEAU, dateStyle: 'long', timeStyle: 'short' }).format(new Date()),
  };
}
