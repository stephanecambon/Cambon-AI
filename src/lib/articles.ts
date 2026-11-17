import { getCollection, type CollectionEntry } from 'astro:content';
import { articleUrl, routes, type Lang, type Alternates } from '../i18n';

export type Article = CollectionEntry<'articles'>;

/** Nom de fichier de l'article, sans la langue. */
export const articleSlug = (a: Article) => a.id.split('/').slice(1).join('/');

/** Clé commune aux deux langues : le nom du fichier français. */
const keyOf = (a: Article) => a.data.translationOf ?? articleSlug(a);

/** Articles publiés d'une langue, du plus récent au plus ancien. Les brouillons sont exclus. */
export async function getArticles(lang: Lang) {
  const all = await getCollection('articles', ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Date lisible dans la langue de la page (fuseau de Paris). */
export const formatDate = (d: Date, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(d);

/**
 * Chemins statiques du blog d'une langue : la liste (slug vide) et chaque article.
 * Aucun article publié : aucune page.
 */
export async function blogPaths(lang: Lang) {
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  const mine = await getArticles(lang);
  if (mine.length === 0) return [];
  const theirs = await getArticles(other);
  const blogOther = theirs.length ? routes.blog[other] : routes.home[other];
  const index = {
    params: { slug: undefined },
    props: { article: null, articles: mine, alternates: { [lang]: routes.blog[lang], [other]: blogOther } as Alternates },
  };
  const pages = mine.map((article) => {
    const twin = theirs.find((a) => keyOf(a) === keyOf(article));
    const alternates = {
      [lang]: articleUrl(lang, articleSlug(article)),
      [other]: twin ? articleUrl(other, articleSlug(twin)) : blogOther,
    } as Alternates;
    return { params: { slug: articleSlug(article) }, props: { article, articles: mine, alternates } };
  });
  return [index, ...pages];
}
