import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Projet = CollectionEntry<'projets'>;

/** Nom de fichier du projet, sans la langue (ex. « appels-offres »). */
export const slugOf = (p: Projet) => p.id.split('/').slice(1).join('/');

/** Clé commune aux deux langues : le nom du fichier français. */
export const keyOf = (p: Projet) => p.data.translationOf ?? slugOf(p);

/** Projets publiés d'une langue, triés par `order`. Les brouillons sont exclus. */
export async function getProjets(lang: Lang) {
  const all = await getCollection(
    'projets',
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft,
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}
