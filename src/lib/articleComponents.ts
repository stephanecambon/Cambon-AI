// Articles interactifs : composant Astro complet (mise en page, styles, script),
// choisi par le champ `component` de l'article.
import ParametreR from '../components/articles/ParametreR.astro';

export const articleComponents: Record<string, typeof ParametreR> = {
  'parametre-r': ParametreR,
};
