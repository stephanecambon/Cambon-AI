import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

/** Projets publiés d'une langue, triés par `order`. Les brouillons sont exclus. */
export async function getProjets(lang: Lang) {
  const all = await getCollection(
    'projets',
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft,
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}
