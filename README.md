# Site cambon.ai

Site vitrine de Cambon AI, en ligne sur https://cambon.ai (français) et https://cambon.ai/en/ (anglais).

Le site se met à jour tout seul : à chaque fois qu'une modification est envoyée sur GitHub (branche `main`), il est reconstruit puis publié en 1 à 2 minutes.

---

## Modifier un texte

Tous les textes du site sont regroupés dans deux fichiers :

- `src/i18n/fr.ts` : les textes en français
- `src/i18n/en.ts` : les mêmes textes en anglais

Ouvrez le fichier, trouvez la phrase et modifiez-la entre les guillemets. Les deux fichiers ont la même structure : si vous changez une phrase en français, pensez à changer sa traduction au même endroit dans le fichier anglais.

Deux règles :

- **Surligner un mot en ambre** : entourez-le de `==`. Exemple : `==à l'échelle de votre entreprise==`.
- **Apostrophes** : si la phrase est entre guillemets doubles `"…"`, vous pouvez écrire `l'accueil` librement. Si elle est entre guillemets simples `'…'`, utilisez des guillemets doubles à la place dès que la phrase contient une apostrophe.

Les mentions légales sont aussi dans `fr.ts` et `en.ts`, rubrique `legal`.

## Réglages généraux

Ils sont regroupés dans `src/config.ts` :

- `BOOKING_URL` : le lien de prise de rendez-vous (Google Agenda), utilisé par tous les boutons « Prendre rendez-vous ».
- `NEWSLETTER_URL` : l'adresse du script Google qui enregistre les inscriptions à la newsletter.
- `AUDIENCE_URL` : l'adresse du script Google de mesure d'audience (voir `tools/audience/README.md`). Vide = mesure désactivée.
- `CONTACT_EMAIL` : l'adresse affichée en pied de page.
- **La photo** : déposez votre photo sous le nom `public/images/stephane-cambon.jpg` (format portrait, environ 800 × 1000 px). Elle remplace automatiquement le cadre « Photo à venir ».

## Newsletter : la liste des inscrits

- **Où ?** Dans le tableur Google Sheets **« Cambon AI · Inscriptions newsletter »**, dans le Drive de stephane@cambon.ai, onglet « Inscriptions ». Colonnes : `date`, `email`, `langue`, `page`, `consentement`.
- **Exporter la liste** : dans le tableur, **Fichier › Télécharger › Valeurs séparées par des virgules (.csv)**, ou copier la colonne `email`.
- **Traiter une désinscription** : retrouvez l'adresse (Cmd + F), clic droit sur le numéro de la ligne, **Supprimer la ligne**. Répondez à la personne pour confirmer.
- **Durée de conservation** : une fois par an, supprimez les inscrits sans aucun contact avec vous depuis trois ans (voir la page Confidentialité).
- **Mise en place et dépannage du script** : `tools/newsletter/README.md`.

## Ajouter ou modifier un projet

Chaque projet est un petit fichier texte, un par langue. Le nom du fichier donne l'adresse de la page :

- en français : `src/content/projets/fr/nom-du-projet.md` → `cambon.ai/projets/nom-du-projet/`
- en anglais : `src/content/projets/en/project-name.md` → `cambon.ai/en/projects/project-name/`

Le plus simple est de copier un projet existant et de remplacer les textes. Les champs :

| Champ             | Ce qu'on y met                                                                 |
| ----------------- | ------------------------------------------------------------------------------ |
| `translationOf`   | Fichier anglais uniquement : le nom du fichier français correspondant          |
| `title`           | Le titre                                                                       |
| `image`           | Le nom du fichier image, sans extension, déposé dans `src/assets/projets/` (format 16:10, environ 1600 × 1000 px) |
| `imageAlt`        | Une phrase qui décrit l'image, pour les personnes malvoyantes                  |
| `kicker`          | Le surtitre (catégorie · secteur), aussi affiché sur la carte                  |
| `category`        | `difficile`, `production` ou `saas` (sert aux filtres ; toujours en français)  |
| `summary`         | La phrase de résumé, sous le titre                                             |
| `context`         | Facultatif : le contexte                                                       |
| `problemLabel`    | Facultatif : un autre intitulé que « Le problème »                             |
| `problem`         | Le problème                                                                    |
| `approach`        | Les étapes, une par ligne commençant par `- text:`                              |
| `result`          | Le résultat                                                                    |
| `resultHighlight` | Le morceau du résultat à surligner, recopié exactement                         |
| `transferable`    | Ce qui est transposable                                                        |
| `links`           | Facultatif : les liens (`label` = texte affiché, `url` = adresse)              |
| `cardProblem`, `cardApproach`, `cardResult` | Les trois phrases courtes de la carte                |
| `seoTitle`        | Le titre pour Google et les réseaux : 60 caractères maximum                    |
| `seoDescription`  | La description pour Google : 155 caractères maximum                            |
| `order`           | L'ordre d'affichage : 1 apparaît en premier                                    |
| `draft`           | Facultatif : `true` = brouillon, invisible sur le site                         |

Si un champ manque, dépasse sa longueur maximale ou contient une valeur non prévue, la publication s'arrête et GitHub affiche une erreur qui indique le fichier et le champ en cause. Le site en ligne reste alors inchangé.

## Publier

**Le plus simple : demander à votre assistant de code** (« publie les modifications »). Il vérifie que le site se construit sans erreur, puis l'envoie sur GitHub.

**Directement sur github.com** : ouvrez le fichier dans le dépôt `stephanecambon/Cambon-AI`, cliquez sur l'icône crayon, modifiez, puis « Commit changes ». La publication part automatiquement.

**Suivre une publication** : onglet « Actions » du dépôt sur GitHub. Une coche verte veut dire que c'est en ligne ; une croix rouge veut dire qu'il y a une erreur, et le site en ligne n'a pas été modifié.

## Voir le site sur son ordinateur avant de publier

Dans un terminal, depuis ce dossier :

```bash
npm install
npm run dev
```

puis ouvrir http://localhost:4321. Les modifications s'affichent dès l'enregistrement du fichier.

## Où se trouve quoi

```
src/
  config.ts              Éléments à compléter (rendez-vous, liens, photo…)
  i18n/fr.ts, en.ts      Tous les textes, en français et en anglais
  content/projets/       Les projets (un fichier par projet et par langue)
  styles/global.css      Couleurs, polices et éléments du design
  components/            Morceaux de page (en-tête, pied de page, accroche…)
  pages/                 Les pages : /, /projets/, /mentions-legales/, /confidentialite/ et leurs équivalents /en/
public/
  CNAME                  Nom de domaine (cambon.ai) pour GitHub Pages
  favicon.svg            Icône de l'onglet
  og-fr.png, og-en.png   Images affichées quand on partage le site (1200 × 630)
  images/                Photo de la section « Qui je suis »
  robots.txt             Consignes pour les moteurs de recherche
.github/workflows/       Publication automatique
tools/newsletter/        Script Google Apps Script de la newsletter et son mode d'emploi
```
