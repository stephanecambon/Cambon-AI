# CLAUDE.md — site cambon.ai

Site vitrine de Cambon AI (SASU, Paris), R&D appliquée pour PME et ETI. Propriétaire : Stéphane Cambon, qui ne travaille pas dans le terminal. Explique chaque action en français simple. Demande avant toute action visible publiquement : **chaque push sur `main` met le site en ligne**, de même que les réglages GitHub et les DNS.

## Règles de contenu (non négociables)

- **Textes français validés : intégrer mot pour mot.** Ne rien reformuler. Une faute ou une incohérence se signale à Stéphane, elle ne se corrige pas d'office.
- **Le site ne mentionne jamais Claude**, ni aucun nom de modèle ou d'éditeur d'IA. On dit « IA », de manière générique. Cette règle vaut pour tout le dépôt public (README, commentaires, noms de fichiers), sauf ce fichier.
- **Anonymisation.** Aucun nom de client. Le cabinet de maîtrise d'ouvrage n'est ni nommé ni situé.
- **Biotech : rester strictement vague.** Jamais de test (au sens de produit de diagnostic), de diagnostic, de domaine vétérinaire, d'ELISA, de plaques, de réactifs ni de dilutions. Uniquement « biotech », « expériences », « paramètres ».
- **Première personne du singulier** (« je »). Exceptions voulues : « Nous avons construit… » (l'équipe d'Ownpage, section 05) et « à notre connaissance » (JouetSwap, projet mené avec son fils).
- **Surligneur ambre : un seul mot ou une seule expression par bloc** (« à l'échelle de votre entreprise » dans l'accroche, le résultat de chaque projet).
- **Version anglaise** : adaptation naturelle de site professionnel, pas de traduction littérale ; mêmes règles que le français. Tout nouveau texte EN est validé par Stéphane avant publication.
- Vérification avant chaque publication : `grep -rliE "claude|anthropic|cambea|elisa|v[ée]t[ée]rinaire|innovative" dist` ne doit rien trouver.

## Newsletter (formulaire)

- **Données minimales** : le tableur ne reçoit que `date`, `email`, `langue`, `page`, `consentement` (version du texte, ex. `v1-2026-11`). Jamais d'adresse IP, de navigateur ni d'autre champ. Toute donnée en plus impose de mettre à jour la page Confidentialité.
- **Consentement obligatoire** : case non précochée, `required` côté site, revérifiée par le script (`consentement=oui` + version listée dans `CONSENT_VERSIONS`). Si le texte de la case change : nouvelle `NEWSLETTER_CONSENT_VERSION` dans `src/config.ts` et dans `Code.gs`.
- **Aucun service tiers hors Google Workspace, aucun cookie.** Le JavaScript de la newsletter est l'amélioration progressive du formulaire (`src/components/Newsletter.astro`), servi depuis cambon.ai.
- **Fonctionne sans JavaScript** : `<form method="post" action={NEWSLETTER_URL}>` classique ; le script renvoie alors une page HTML bilingue (lien de retour en `target="_top"`, car Apps Script sert le HTML dans un cadre).
- **Avec JavaScript** : `fetch` POST de type « simple » (`URLSearchParams`, aucun en-tête personnalisé) pour éviter la pré-vérification CORS qu'Apps Script ne gère pas ; `format=json` et `sent` ajoutés. La réponse arrive après redirection vers `script.googleusercontent.com` (`Access-Control-Allow-Origin: *`). Si la réponse est illisible, retour à l'envoi classique (doublons ignorés côté script).
- Anti-robots : champ piège `website` et horodatage `t` (+ `sent` côté JS) : moins de 3 s = ignoré en silence. Doublon = pas de ligne, même message de succès.
- Script : `tools/newsletter/Code.gs` (le dépôt fait foi ; Stéphane le recopie dans Apps Script, puis « Gérer les déploiements › Nouvelle version » pour garder la même URL). Mode d'emploi : `tools/newsletter/README.md`.
- Tant que `NEWSLETTER_URL` commence par `[`, le formulaire et la ligne « Recevez mes analyses » du bloc d'appel à l'action ne sont pas affichés.
- Pages `/confidentialite/` et `/en/privacy/` (textes dans `privacy` de `fr.ts`/`en.ts`), liées depuis le pied de page et la case de consentement.

## Mesure d'audience (maison, sans cookie)

- Même modèle que la newsletter : `src/components/Audience.astro` (script en ligne, sans dépendance, inclus dans `Base.astro`) envoie des événements à un Apps Script séparé, `tools/audience/Code.gs` (le dépôt fait foi), qui les écrit dans le tableur privé « Cambon AI · Audience » (onglet « Événements »). Mode d'emploi : `tools/audience/README.md`.
- **Événements** : « vue » au chargement ; « fin » avec la durée visible cumulée (`visibilitychange` → `hidden`, `pagehide`). Envoi `fetch` `keepalive` `no-cors`, corps texte, `credentials: 'omit'` (aucun cookie Google du visiteur) et `referrerPolicy: 'no-referrer'` ; jamais `sendBeacon`, qui joindrait les cookies. Tout en `try/catch`, aucune erreur visible.
- **Champs** (et rien d'autre) : `type`, `visite`, `vue`, `page`, `langue`, `provenance`, `utm_source`, `utm_medium`, `utm_campaign`, `appareil` (< 760 px = mobile), `duree_s`. Le script ajoute `horodatage` et `provenance_brute`, tronque à 200 caractères, n'enregistre ni IP ni navigateur. Toute donnée en plus impose de mettre à jour la page Confidentialité.
- **Visite** : identifiant aléatoire dans `sessionStorage['cambon-visite']`, renouvelé à chaque arrivée depuis un autre site. **Vue** : identifiant en mémoire. Stockage inaccessible : vue mesurée sans visite.
- **Pas de mesure** si : `AUDIENCE_URL` vide, page servie ailleurs que sur le domaine de `site` (`astro.config`, donc ni aperçu local ni copie du site), Global Privacy Control, `doNotTrack === '1'`, `navigator.webdriver`, page en prérendu (attente de l'activation), ou `localStorage['cambon-no-audience'] === '1'` (bouton « Ne pas être mesuré sur ce site » de la page Confidentialité ; le refus coupe aussi les envois de la page en cours).
- **Garde-fous du script** : plafonds `MAX_EVENTS_PER_DAY` (10 000, compteur dans `CacheService`) et `MAX_ROWS` (400 000) ; événement refusé si la page n'est pas un chemin propre ou si la provenance n'est pas `direct`, `interne` ou un nom de domaine ; `utm` réduits aux lettres, chiffres, espaces, `-`, `_`, `+` ; toute valeur texte écrite avec une apostrophe initiale (ni formule, ni date, ni nombre).
- **Provenances** : table `PROVENANCES` en haut de `Code.gs` (linkedin, google, gmail, facebook, x, bing, duckduckgo, qwant ; le reste tel quel sans `www.`). Pas de nom d'assistant IA dans le dépôt public : ces domaines sont regroupés sous « ia » par la propriété de script `PROVENANCES_SUPPLEMENTAIRES` (« domaine=nom; … », lue avant la table), saisie par Stéphane dans Apps Script.
- **Tableau de bord** : formules uniquement (`QUERY … GROUP BY`, onglet de calcul masqué `_visites`, une ligne par visite des 30 derniers jours). Aucune valeur en dur. `setup()` le recrée sans toucher aux événements.
- **Conservation** : 13 mois, `purge()` lancée chaque mois par un déclencheur temporel.

## Réglages et repères

Tout est dans `src/config.ts` :

- `BOOKING_URL` : page de rendez-vous Google Agenda (tous les boutons « Prendre rendez-vous »).
- `NEWSLETTER_URL` : application web Apps Script de la newsletter. `NEWSLETTER_CONSENT_VERSION` : version du texte de consentement.
- `AUDIENCE_URL` : application web Apps Script de la mesure d'audience. Vide = mesure désactivée (aucun script dans les pages).
- `URL_PLACEHOLDERS` / `TEXT_PLACEHOLDERS` : mécanisme de repères entre crochets (`[MON_REPÈRE]`), vide aujourd'hui. Un lien dont l'URL commence par `[` n'est pas affiché ; un `BOOKING_URL` ou `NEWSLETTER_URL` qui commence par `[` bascule en `mailto:` ou masque le formulaire.
- `PHOTO_PATH` : photo de « Qui je suis ». **Reste à fournir** : `public/images/stephane-cambon.jpg` (sinon cadre « Photo à venir »).

## Pile technique

- Astro 7, sortie 100 % statique. Pas de framework JS côté client ; de petits `<script>` en amélioration progressive : formulaire newsletter (`Newsletter.astro`), mesure d'audience (`Audience.astro`), bouton d'opposition de la page Confidentialité (`Privacy.astro`), animation du logo et masquage de la ligne de navigation mobile au défilement (`Header.astro`, classe `js-hdr` sur `<html>`, en-tête `fixed` + `--header-full-h` seulement avec JS ; sans JS, en-tête collé classique). Les filtres de la page Projets sont en CSS pur (boutons radio + `:has()`) : sans `:has()` ni JS, tous les projets restent visibles.
- Hébergement : GitHub Pages, dépôt public `stephanecambon/Cambon-AI`. Le workflow `.github/workflows/deploy.yml` (`withastro/action` puis `actions/deploy-pages`) se déclenche à chaque push sur `main`.
- Domaine `cambon.ai` (apex), `www` redirige vers l'apex. Le fichier `public/CNAME` doit rester présent.
- **Ne jamais toucher aux DNS MX/TXT** : la messagerie Google Workspace tourne sur ce domaine.
- Pas de cookies, pas d'analytics tiers, pas de ressource tierce (polices auto-hébergées via l'API `fonts` d'Astro). Seuls services externes : les deux scripts Apps Script (newsletter, mesure d'audience). En ajouter impose de revoir le RGPD et les mentions légales.
- `npm run build` lance `astro check` (types) puis le build : il doit passer avant toute publication.

## Langues et pages

- Français à la racine (`/`), anglais sous `/en/`. Routage i18n natif (`prefixDefaultLocale: false`), `trailingSlash: 'always'`.
- Pages : `/`, `/projets/`, `/projets/<slug>/`, `/mentions-legales/`, `/confidentialite/` ; `/en/`, `/en/projects/`, `/en/projects/<slug>/`, `/en/legal/`, `/en/privacy/`.
- **Tous les textes d'interface et de l'accueil** sont dans `src/i18n/fr.ts` et `src/i18n/en.ts`. `en.ts` est typé sur `fr.ts` : toute clé FR doit exister en EN. Pas de texte en dur dans les composants.
- Affichage des textes : `plain(text, lang)` (placeholders + espaces insécables de la typographie française) ou `rich(text, lang)` avec `set:html` (en plus, `==mot==` devient surligné). Ne jamais afficher un texte brut sans passer par l'un des deux.
- `routes` (`src/i18n/index.ts`) donne l'URL FR/EN des pages fixes ; le layout `Base` reçoit `alternates` (lien FR · EN, `hreflang`, `canonical`). Les fiches projet calculent leurs `alternates` via `src/lib/projectPaths.ts`.
- Données structurées (JSON-LD, `src/lib/seo.ts`) : accueil = `ProfessionalService` + `Person` + `WebSite` ; page Projets = `BreadcrumbList` + `ItemList` ; fiche = `BreadcrumbList` + `CreativeWork`. Passées au layout via `jsonLd`. Image de partage des fiches = image du projet en 1200 × 750 JPEG (`ogImage`). Google Search Console : propriété de domaine `cambon.ai` (compte stephane@cambon.ai), sitemap `https://cambon.ai/sitemap-index.xml` soumis.
- Référencement : `<title>` ≤ 60 caractères, `meta description` ≤ 155 (contrôlés par le schéma pour les projets ; à vérifier à la main pour `meta` dans `fr.ts`/`en.ts`). Images Open Graph : `public/og-fr.png` et `public/og-en.png` (1200 × 630, titre principal), générées avec Chrome headless à partir d'une page HTML aux polices du site.

## Accueil (`src/components/Home.astro`)

Sections numérotées en ambre foncé : 00 accroche + encart « Fiche » (`Hero.astro`), 01 Le constat + schéma des trois couches (`Layers.astro`), 02 Ce que je fais, 03 Comment je travaille (ancre `#approche`), 04 Pourquoi moi, 05 Qui je suis (`#a-propos`), 06 Projets (6 cartes), 07 appel à l'action (`Cta.astro`).

Schéma des trois couches : bloc sombre en HTML/CSS (fond `--plan-bg` `#0E2E55`, texte `--plan-text` `#EAF2FF`, secondaire `--plan-muted` `#A4BCDD`, traits `--plan-rule` `#3F6698`). L'ambre y est **réservé à Cambon AI**. La barre verticale « Cambon AI » couvre la couche 3 et la moitié haute de la couche 2 (chaque couche occupe 2 lignes de grille, la barre en couvre 3). Entre 720 et 900 px : une pile par couche, libellés « Avant / Maintenant » visibles. Sous 720 px : accordéon `<details>/<summary>` (bloc `.lm` dédié, sans JS), couche 3 ouverte par défaut, barre ambre en pseudo-élément du `<details>` pour rester visible couche repliée. Sur ordinateur, la grille est inchangée.

## Contenu : collection `projets`

- Schéma : `src/content.config.ts`. Fichiers : `src/content/projets/fr/<slug>.md` et `src/content/projets/en/<slug>.md` ; le nom du fichier donne l'URL. Un fichier EN porte `translationOf: <slug FR>`.
- Images : `image` = nom de fichier (sans extension) dans `src/assets/projets/` (16:10, au moins 2400 × 1500 pour les écrans Retina, sans métadonnées ; captures en double densité), chargé via `projectImage()` (`src/lib/projectImages.ts`) et `<Image>` d'Astro ; `imageAlt` traduit par langue. Ne pas utiliser `image()` du schéma : il casse en mode dev à cause des espaces dans le chemin du dossier. Projets anonymes (appels d'offres, biotech) : illustrations abstraites maison, jamais de photo de client ni de matériel de laboratoire.
- Champs : `title`, `image`, `imageAlt`, `kicker` (surtitre, aussi affiché sur la carte), `category` (`difficile` | `production` | `saas`), `summary`, `context?`, `problemLabel?` (si l'intitulé n'est pas « Le problème »), `problem`, `approach` (liste `{ title?, text }`), `result`, `resultHighlight` (doit figurer tel quel dans `result`, sinon erreur), `transferable`, `links?` (`{ label?, url }`), `cardProblem`, `cardApproach`, `cardResult`, `seoTitle` (≤ 60), `seoDescription` (≤ 155), `order`, `draft`.
- Ordre : 1 appels d'offres, 2 biotech, 3 robotique, 4 licence globale presse, 5 Briefd, 6 JouetSwap.
- Carte (`ProjectCard.astro`) : pas de fond, pas de cadre, pas de trait ; ordre : surtitre, titre, problème, approche, résultat surligné.
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

- **Picto et logo** : picto « C » bleu de plan autour du carré ambre « AI », en SVG en ligne (`src/components/Picto.astro`). Logo de la tétière = picto + « CAMBON » + « AI » sur fond ambre (`Logo.astro`, choix de Stéphane) ; petit picto dans le pied de page ; favicons (`public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`) régénérés sans métadonnées. Les originaux (`public/brand/`) contiennent des métadonnées de provenance qui nomment l'outil de création : ils sont exclus du dépôt (`.gitignore`) et ne doivent pas être publiés tels quels.
- **Animation du logo** (en-tête) : une fois au chargement de chaque page (400 ms après `load`, ordinateur et mobile), puis au survol (souris uniquement, `hover: hover`) ou au focus clavier du lien, le groupe `.logo-ai` du picto (carré ambre + « AI ») ressort de 60 unités vers la droite puis s'emboîte (`@keyframes logo-emboite`, 0,7 s, aucun rebond, ne dépasse jamais le bord ouvert du « C » ni la barre). Classe `.is-animating` posée en JS et retirée à `animationend` : l'animation va toujours au bout et ne se relance pas en cours. Sans JS ou avec `prefers-reduced-motion` : logo statique. Sur mobile, pas de relance au toucher. Lien libellé « Cambon AI, accueil » / « Cambon AI, home ».
- Polices : Barlow Condensed 600 en capitales pour les titres (`--font-title`), Barlow 400/500/600/700 pour le texte (`--font-text`).
- Fond : lignes de cahier (gradient 1 px, pas de 34 px) sur `body`.
- **Pas de liserés foncés** (choix de Stéphane, novembre 2026) : aucun trait `--ink` sur les sections, cartes, blocs ou images. Les sections sont séparées par l'espacement ; seuls des traits gris clairs (`--rule`) sont permis là où un repère est utile (tétière, pied de page, listes). Les contours `--ink` sont réservés aux boutons et aux filtres.
- **Fond blanc (`--surface`)** pour la tétière, le pied de page et tous les encadrés (encart « Fiche », « Ce que je ne fais pas », champ et messages de la newsletter). Le fond papier ligné reste pour le corps de page ; le schéma des trois couches reste un bloc sombre.
- **Chaque section a un surtitre et un titre** (`SectionHead` : `num` + `label` + `title` ; textes `label` dans `fr.ts`/`en.ts`).
- Tétière (`Header.astro`) : fond blanc (`--header-bg`), `position: sticky` en haut ; `--header-h` + `scroll-padding-top` décalent les ancres sous la tétière (à ajuster si sa hauteur change).
- Classes : `.section` (espacement vertical, sans trait), `.eyebrow` + `.eyebrow__num`, `.surligne`, `.btn` + `.btn--primary` / `.btn--outline` / `.btn--small`, `.container`, `.lead`, `.prose`, `.list`, `.cards`.
- Angles : `--radius` (2 px).
- Accessibilité : contraste ≥ 4,5:1 pour le texte. **Jamais `#FFB347` comme couleur de texte** sur le papier. Focus visible conservé.
- Responsive : doit fonctionner à 375 px sans défilement horizontal. Sur mobile (≤ 860 px), toute zone cliquable fait au moins 44 px de haut (menu, FR · EN, case et lien de la newsletter, liens du pied de page), sans changer le rendu sur ordinateur.

## Règles Git

- Ne jamais `git push` sans demande explicite. Pas d'amend, pas de force-push.
