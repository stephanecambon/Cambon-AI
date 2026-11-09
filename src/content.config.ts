import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un fichier Markdown par projet et par langue :
//   src/content/projets/fr/<slug>.md   →  /projets/<slug>/
//   src/content/projets/en/<slug>.md   →  /en/projects/<slug>/
// Le nom du fichier donne l'adresse de la page.
const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z
    .object({
      /** EN uniquement : nom du fichier français correspondant (ex. « appels-offres »). */
      translationOf: z.string().optional(),

      title: z.string(),
      /** Nom du fichier image (sans extension) dans src/assets/projets/, format 16:10. */
      image: z.string(),
      /** Description de l'image pour les lecteurs d'écran. */
      imageAlt: z.string(),
      /** Surtitre de la fiche, aussi affiché sur la carte (catégorie et secteur). */
      kicker: z.string(),
      category: z.enum(['difficile', 'production', 'saas']),
      /** Phrase de résumé, sous le titre. */
      summary: z.string(),

      context: z.string().optional(),
      /** Intitulé de la rubrique problème, si différent de « Le problème ». */
      problemLabel: z.string().optional(),
      problem: z.string(),
      approach: z
        .array(
          z.object({
            /** Titre en gras de l'étape (facultatif). */
            title: z.string().optional(),
            text: z.string(),
          }),
        )
        .min(1),
      result: z.string(),
      /** Partie du résultat mise en avant au surligneur : doit figurer telle quelle dans `result`. */
      resultHighlight: z.string(),
      transferable: z.string(),
      links: z
        .array(z.object({ label: z.string().optional(), url: z.string() }))
        .optional(),

      cardProblem: z.string(),
      cardApproach: z.string(),
      cardResult: z.string(),

      /** Référencement : 60 et 155 caractères maximum. */
      seoTitle: z.string().max(60),
      seoDescription: z.string().max(155),

      order: z.number().int(),
      draft: z.boolean().default(false),
    })
    .refine((p) => p.result.includes(p.resultHighlight), {
      message: '`resultHighlight` doit être une partie exacte de `result`.',
      path: ['resultHighlight'],
    }),
});

export const collections = { projets };
