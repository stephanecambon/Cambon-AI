# CLAUDE.md — site cambon.ai

Site vitrine de Cambon AI (SASU, Paris), R&D appliquée pour PME et ETI. Propriétaire : Stéphane Cambon, qui ne travaille pas dans le terminal. Explique chaque action en français simple. Demande avant toute action visible publiquement : **chaque push sur `main` met le site en ligne**, de même que les réglages GitHub et les DNS.

## Règles de contenu (non négociables)

- **Textes français validés : intégrer mot pour mot.** Ne rien reformuler. Une faute ou une incohérence se signale à Stéphane, elle ne se corrige pas d'office.
- **Le site ne mentionne jamais Claude**, ni aucun nom de modèle ou d'éditeur d'IA. On dit « IA », de manière générique. Cette règle vaut pour tout le dépôt public (README, commentaires, noms de fichiers), sauf ce fichier.
- **Anonymisation.** Aucun nom de client. Le cabinet de maîtrise d'ouvrage n'est ni nommé ni situé.
- **Biotech : rester strictement vague.** Jamais de test (au sens de produit de diagnostic), de diagnostic, de domaine vétérinaire, d'ELISA, de plaques, de réactifs ni de dilutions. Uniquement « biotech », « expériences », « paramètres ».
- **Première personne du singulier** (« je »). Exceptions voulues : « Nous avons construit… » (l'équipe d'Ownpage, section 05) et « à notre connaissance » (JouetSwap, projet mené avec son fils).
- **Surligneur ambre : un seul mot ou une seule expression par bloc** (« rapportent » dans l'accroche, le résultat de chaque projet).
- **Version anglaise** : adaptation naturelle de site professionnel, pas de traduction littérale ; mêmes règles que le français. Tout nouveau texte EN est validé par Stéphane avant publication.
- Vérification avant chaque publication : `grep -rliE "claude|anthropic|cambea|elisa|v[ée]t[ée]rinaire|innovative" dist` ne doit rien trouver.

## Newsletter (formulaire)

- **Données minimales** : le tableur ne reçoit que `date`, `email`, `langue`, `page`, `consentement` (version du texte, ex. `v1-2026-11`). Jamais d'adresse IP, de navigateur ni d'autre champ. Toute donnée en plus impose de mettre à jour la page Confidentialité.
- **Consentement obligatoire** : case non précochée, `required` côté site, revérifiée par le script (`consentement=oui` + version listée dans `CONSENT_VERSIONS`). Si le texte de la case change : nouvelle `NEWSLETTER_CONSENT_VERSION` dans `src/config.ts` et dans `Code.gs`.
- **Aucun service tiers hors Google Workspace, aucun cookie, aucun traceur.** Le seul JavaScript du site est l'amélioration progressive du formulaire (`src/components/Newsletter.astro`), servi depuis cambon.ai.
- **Fonctionne sans JavaScript** : `<form method="post" action={NEWSLETTER_URL}>` classique ; le script renvoie alors une page HTML bilingue (lien de retour en `target="_top"`, car Apps Script sert le HTML dans un cadre).
- **Avec JavaScript** : `fetch` POST de type « simple » (`URLSearchParams`, aucun en-tête personnalisé) pour éviter la pré-vérification CORS qu'Apps Script ne gère pas ; `format=json` et `sent` ajoutés. La réponse arrive après redirection vers `script.googleusercontent.com` (`Access-Control-Allow-Origin: *`). Si la réponse est illisible, retour à l'envoi classique (doublons ignorés côté script).
- Anti-robots : champ piège `website` et horodatage `t` (+ `sent` côté JS) : moins de 3 s = ignoré en silence. Doublon = pas de ligne, même message de succès.
- Script : `tools/newsletter/Code.gs` (le dépôt fait foi ; Stéphane le recopie dans Apps Script, puis « Gérer les déploiements › Nouvelle version » pour garder la même URL). Mode d'emploi : `tools/newsletter/README.md`.
- Tant que `NEWSLETTER_URL` commence par `[`, le formulaire et la ligne « Recevez mes analyses » du bloc d'appel à l'action ne sont pas affichés.
- Pages `/confidentialite/` et `/en/privacy/` (textes dans `privacy` de `fr.ts`/`en.ts`), liées depuis le pied de page et la case de consentement.

## Réglages et repères

Tout est dans `src/config.ts` :

- `BOOKING_URL` : page de rendez-vous Google Agenda (tous les boutons « Prendre rendez-vous »).
- `NEWSLETTER_URL` : application web Apps Script de la newsletter. `NEWSLETTER_CONSENT_VERSION` : version du texte de consentement.
- `URL_PLACEHOLDERS` / `TEXT_PLACEHOLDERS` : mécanisme de repères entre crochets (`[MON_REPÈRE]`), vide aujourd'hui. Un lien dont l'URL commence par `[` n'est pas affiché ; un `BOOKING_URL` ou `NEWSLETTER_URL` qui commence par `[` bascule en `mailto:` ou masque le formulaire.
- `PHOTO_PATH` : photo de « Qui je suis ». **Reste à fournir** : `public/images/stephane-cambon.jpg` (sinon cadre « Photo à venir »).

## Pile technique

- Astro 7, sortie 100 % statique. Pas de framework JS côté client ; un seul `<script>` (formulaire newsletter). Les filtres de la page Projets sont en CSS pur (boutons radio + `:has()`) : sans `:has()` ni JS, tous les projets restent visibles.
- Hébergement : GitHub Pages, dépôt public `stephanecambon/Cambon-AI`. Le workflow `.github/workflows/deploy.yml` (`withastro/action` puis `actions/deploy-pages`) se déclenche à chaque push sur `main`.
- Domaine `cambon.ai` (apex), `www` redirige vers l'apex. Le fichier `public/CNAME` doit rester présent.
- **Ne jamais toucher aux DNS MX/TXT** : la messagerie Google Workspace tourne sur ce domaine.
- Pas d'analytics, pas de cookies, pas de formulaire, pas de ressource tierce (polices auto-hébergées via l'API `fonts` d'Astro). En ajouter impose de revoir le RGPD et les mentions légales.
- `npm run build` lance `astro check` (types) puis le build : il doit passer avant toute publication.

## Langues et pages

- Français à la racine (`/`), anglais sous `/en/`. Routage i18n natif (`prefixDefaultLocale: false`), `trailingSlash: 'always'`.
- Pages : `/`, `/projets/`, `/projets/<slug>/`, `/mentions-legales/`, `/confidentialite/` ; `/en/`, `/en/projects/`, `/en/projects/<slug>/`, `/en/legal/`, `/en/privacy/`.
- **Tous les textes d'interface et de l'accueil** sont dans `src/i18n/fr.ts` et `src/i18n/en.ts`. `en.ts` est typé sur `fr.ts` : toute clé FR doit exister en EN. Pas de texte en dur dans les composants.
- Affichage des textes : `plain(text, lang)` (placeholders + espaces insécables de la typographie française) ou `rich(text, lang)` avec `set:html` (en plus, `==mot==` devient surligné). Ne jamais afficher un texte brut sans passer par l'un des deux.
- `routes` (`src/i18n/index.ts`) donne l'URL FR/EN des pages fixes ; le layout `Base` reçoit `alternates` (lien FR · EN, `hreflang`, `canonical`). Les fiches projet calculent leurs `alternates` via `src/lib/projectPaths.ts`.
- Référencement : `<title>` ≤ 60 caractères, `meta description` ≤ 155 (contrôlés par le schéma pour les projets ; à vérifier à la main pour `meta` dans `fr.ts`/`en.ts`). Images Open Graph : `public/og-fr.png` et `public/og-en.png` (1200 × 630, titre principal), générées avec Chrome headless à partir d'une page HTML aux polices du site.

## Accueil (`src/components/Home.astro`)

Sections numérotées en ambre foncé : 00 accroche + encart « Fiche » (`Hero.astro`), 01 Le constat + schéma des trois couches (`Layers.astro`), 02 Ce que je fais, 03 Comment je travaille (ancre `#approche`), 04 Pourquoi moi, 05 Qui je suis (`#a-propos`), 06 Projets (6 cartes), 07 appel à l'action (`Cta.astro`).

Schéma des trois couches : bloc sombre en HTML/CSS (fond `--plan-bg` `#0E2E55`, texte `--plan-text` `#EAF2FF`, secondaire `--plan-muted` `#A4BCDD`, traits `--plan-rule` `#3F6698`). L'ambre y est **réservé à Cambon AI**. La barre verticale « Cambon AI » couvre la couche 3 et la moitié haute de la couche 2 (chaque couche occupe 2 lignes de grille, la barre en couvre 3). Sous 900 px : une pile par couche, libellés « Avant / Maintenant » visibles.

## Contenu : collection `projets`

- Schéma : `src/content.config.ts`. Fichiers : `src/content/projets/fr/<slug>.md` et `src/content/projets/en/<slug>.md` ; le nom du fichier donne l'URL. Un fichier EN porte `translationOf: <slug FR>`.
- Champs : `title`, `kicker` (surtitre, aussi affiché sur la carte), `category` (`difficile` | `production` | `saas`), `summary`, `context?`, `problemLabel?` (si l'intitulé n'est pas « Le problème »), `problem`, `approach` (liste `{ title?, text }`), `result`, `resultHighlight` (doit figurer tel quel dans `result`, sinon erreur), `transferable`, `links?` (`{ label?, url }`), `cardProblem`, `cardApproach`, `cardResult`, `seoTitle` (≤ 60), `seoDescription` (≤ 155), `order`, `draft`.
- Ordre : 1 appels d'offres, 2 biotech, 3 robotique, 4 licence globale presse, 5 Briefd, 6 JouetSwap.
- Carte (`ProjectCard.astro`) : pas de fond ni de cadre, trait de 3 px `--ink` au-dessus ; ordre : surtitre, titre, problème, approche, résultat surligné.
- Fiche (`ProjectPage.astro`) : surtitre, titre, résumé, contexte, problème, approche numérotée, résultat (surligné), transposable, liens, appel à l'action « Un problème qui résiste ? ».

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
- Classes : `.section` (trait 2 px `--ink` en haut), `.eyebrow` + `.eyebrow__num`, `.surligne`, `.btn` + `.btn--primary` / `.btn--outline` / `.btn--small`, `.container`, `.lead`, `.prose`, `.list`, `.cards`.
- Angles : `--radius` (2 px).
- Accessibilité : contraste ≥ 4,5:1 pour le texte. **Jamais `#FFB347` comme couleur de texte** sur le papier. Focus visible conservé.
- Responsive : doit fonctionner à 390 px sans défilement horizontal.

## Règles Git

- Ne jamais `git push` sans demande explicite. Pas d'amend, pas de force-push.
