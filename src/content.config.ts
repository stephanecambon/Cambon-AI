import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un fichier Markdown par projet et par langue :
//   src/content/projets/fr/<nom>.md
//   src/content/projets/en/<nom>.md
const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    title: z.string(),
    /** « difficile » : problème difficile posé et résolu ; « production » : mise en production */
    layer: z.enum(['difficile', 'production']),
    sector: z.string(),
    problem: z.string(),
    approach: z.string(),
    result: z.string(),
    /** Ordre d'affichage (1 = en premier) */
    order: z.number().int(),
    /** true = brouillon, non publié */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projets };
