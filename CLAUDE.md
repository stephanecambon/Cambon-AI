# CLAUDE.md — site cambon.ai

Site vitrine de Cambon AI (SASU, Paris), R&D appliquée pour PME et ETI. Propriétaire : Stéphane Cambon, qui ne travaille pas dans le terminal. Explique chaque action en français simple. Demande avant toute action visible publiquement (push, réglages GitHub, DNS).

## Pile technique

- Astro 7, sortie 100 % statique. Pas de framework JS côté client ; pas de `<script>` sauf nécessité réelle.
- Hébergement : GitHub Pages, dépôt public `stephanecambon/Cambon-AI`. Le workflow `.github/workflows/deploy.yml` (`withastro/action` puis `actions/deploy-pages`) se déclenche à chaque push sur `main`.
- Domaine `cambon.ai` (apex), `www` redirige vers l'apex. Le fichier `public/CNAME` doit rester présent.
- **Ne jamais toucher aux DNS MX/TXT** : la messagerie Google Workspace tourne sur ce domaine.
- Pas d'analytics, pas de cookies, pas de formulaire, pas de ressource tierce (les polices sont auto-hébergées via l'API `fonts` d'Astro). Ajouter l'un d'eux impose de revoir le RGPD et les mentions légales.
- Avant de publier : `npm run build` doit passer.

## Langues

- Français par défaut à la racine (`/`), anglais sous `/en/`. Routage i18n natif d'Astro (`prefixDefaultLocale: false`), `trailingSlash: 'always'`.
- **Tous les textes** sont dans `src/i18n/fr.ts` et `src/i18n/en.ts`. `en.ts` est typé sur `fr.ts` (`Texts`) : toute clé ajoutée en FR doit exister en EN, sinon le build échoue. Pas de texte en dur dans les composants.
- Syntaxe `==mot==` dans un texte : surligné ambre, via `highlight()` dans `src/i18n/index.ts`, qui échappe le HTML.
- Chaque page a une clé dans `routes` (`src/i18n/index.ts`) qui donne son URL en FR et en EN. C'est ce qui alimente le lien « FR · EN », `hreflang`, `canonical`. Nouvelle page = nouvelle entrée dans `routes` + un fichier dans `src/pages/` et un dans `src/pages/en/`, puis passer `page="<clé>"` au layout `Base`.
- Ancres des sections d'accueil : `anchors` dans `src/i18n/index.ts` (`approche`/`approach`, `projets`/`projects`, `a-propos`/`about`).
- La version anglaise est une adaptation naturelle, pas une traduction littérale. Faire valider tout nouveau texte EN par Stéphane avant publication.

## Contenu : collection `projets`

- Schéma dans `src/content.config.ts`. Fichiers : `src/content/projets/{fr,en}/<slug>.md`. La langue vient du dossier.
- Champs : `title`, `layer` (`"difficile"` | `"production"`, valeurs identiques en FR et EN, libellés traduits dans l'interface), `sector`, `problem`, `approach`, `result`, `order` (entier, tri croissant), `draft` (booléen, défaut `false`).
- Lecture : `getProjets(lang)` dans `src/lib/projets.ts` (filtre la langue, exclut les brouillons, trie par `order`).
- `fr/exemple.md` est un brouillon d'exemple, à supprimer quand de vrais projets existent.

## Design « carnet annoté »

Tokens dans `src/styles/global.css` (`:root`). Toujours utiliser les variables, jamais les codes couleur en dur.

| Variable        | Valeur    | Usage                                                     |
| --------------- | --------- | --------------------------------------------------------- |
| `--paper`       | `#F3F1EA` | fond                                                      |
| `--ink`         | `#0E2E55` | titres, traits forts, bordures de boutons                 |
| `--text-2`      | `#24395A` | texte courant                                             |
| `--text-muted`  | `#4A5D78` | texte discret                                             |
| `--rule`        | `#C9CFD8` | traits fins                                               |
| `--amber`       | `#FFB347` | boutons d'action et surligneur **uniquement**             |
| `--amber-dark`  | `#8A4B00` | petits textes d'accent (numéros de section « 00 / »)      |

- Polices : Barlow Condensed 600 en capitales pour les titres (`--font-title`), Barlow 400/500/600/700 pour le texte (`--font-text`).
- Fond : lignes de cahier (gradient 1 px, pas de 34 px) sur `body`.
- Classes : `.section` (trait 2 px `--ink` en haut), `.eyebrow` + `.eyebrow__num` (surtitre numéroté « 01 / »…), `.surligne`, `.btn` + `.btn--primary` (ambre) / `.btn--outline` / `.btn--small`, `.container`.
- Sections numérotées dans l'ordre : l'accroche est « 00 / », la suivante « 01 / », etc.
- Angles : `--radius` (2 px).
- Accessibilité : contraste ≥ 4,5:1 pour le texte. **Jamais `#FFB347` comme couleur de texte** sur le papier. Focus visible conservé.
- Responsive : doit fonctionner à 390 px sans défilement horizontal.

## Réglages et placeholders

- `src/config.ts` : `BOOKING_URL` (placeholder `[LIEN_PAGE_RESERVATION]` ; tant qu'il commence par `[`, les boutons pointent vers `mailto:`), `CONTACT_EMAIL`.
- Mentions légales : numéro RCS encore en placeholder dans `fr.ts` / `en.ts`.

## Règles Git

- Ne jamais `git push` sans demande explicite. Pas d'amend, pas de force-push.
