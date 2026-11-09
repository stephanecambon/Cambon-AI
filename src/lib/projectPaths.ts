import { getProjets, slugOf, keyOf } from './projets';
import { projectUrl, routes, type Lang, type Alternates } from '../i18n';

/** Chemins statiques des fiches d'une langue, avec l'adresse de la fiche équivalente. */
export async function projectPaths(lang: Lang) {
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  const mine = await getProjets(lang);
  const theirs = await getProjets(other);
  return mine.map((projet) => {
    const twin = theirs.find((p) => keyOf(p) === keyOf(projet));
    const alternates = {
      [lang]: projectUrl(lang, slugOf(projet)),
      [other]: twin ? projectUrl(other, slugOf(twin)) : routes.projects[other],
    } as Alternates;
    return { params: { slug: slugOf(projet) }, props: { projet, alternates } };
  });
}
