import type { ImageMetadata } from 'astro';

// Images des articles : src/assets/articles/<nom>.(png|jpg|jpeg|webp)
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/articles/*.{png,jpg,jpeg,webp}', { eager: true });

export function articleImage(name: string): ImageMetadata {
  const hit = Object.entries(files).find(([path]) => path.replace(/^.*\//, '').replace(/\.[^.]+$/, '') === name);
  if (!hit) throw new Error(`Image d'article introuvable : src/assets/articles/${name}.(png|jpg|webp)`);
  return hit[1].default;
}
