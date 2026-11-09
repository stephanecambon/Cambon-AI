import type { ImageMetadata } from 'astro';

// Images des projets : src/assets/projets/<nom>.png|jpg (format 16:10).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/projets/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.[a-z]+$/, ''), mod.default]),
);

/** Image d'un projet à partir de son nom de fichier ; erreur explicite si elle manque. */
export function projectImage(name: string): ImageMetadata {
  const img = byName.get(name);
  if (!img) {
    throw new Error(`Image de projet introuvable : src/assets/projets/${name}.png (champ « image » d'une fiche).`);
  }
  return img;
}
