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

- **Surligner un mot en ambre** : entourez-le de `==`. Exemple : `ceux qui ==rapportent== le plus`.
- **Apostrophes** : si la phrase est entre guillemets doubles `"…"`, vous pouvez écrire `l'accueil` librement. Si elle est entre guillemets simples `'…'`, utilisez des guillemets doubles à la place dès que la phrase contient une apostrophe.

Les réglages généraux sont dans `src/config.ts` :

- `BOOKING_URL` : le lien de prise de rendez-vous. Tant qu'il vaut `[LIEN_PAGE_RESERVATION]`, les boutons « Prendre rendez-vous » ouvrent un e-mail vers stephane@cambon.ai.
- `CONTACT_EMAIL` : l'adresse affichée en pied de page.

Les mentions légales sont aussi dans `fr.ts` et `en.ts`, rubrique `legal`.

## Ajouter un projet

Chaque projet est un petit fichier texte, un par langue :

- en français : `src/content/projets/fr/nom-du-projet.md`
- en anglais : `src/content/projets/en/nom-du-projet.md`

Le plus simple est de copier le fichier d'exemple `src/content/projets/fr/exemple.md` et de remplir les champs :

| Champ      | Ce qu'on y met                                                        |
| ---------- | --------------------------------------------------------------------- |
| `title`    | Le titre du projet                                                    |
| `layer`    | `"difficile"` (problème difficile résolu) ou `"production"` (mise en production) — ces deux mots restent en français, même dans le fichier anglais |
| `sector`   | Le secteur du client                                                  |
| `problem`  | Le problème, en une ou deux phrases                                   |
| `approach` | La démarche                                                           |
| `result`   | Le résultat obtenu                                                    |
| `order`    | L'ordre d'affichage : 1 apparaît en premier                           |
| `draft`    | `true` = brouillon (invisible sur le site), `false` = publié          |

Le texte libre sous les `---` est facultatif.

Si un champ manque ou contient une valeur non prévue, la publication s'arrête et GitHub affiche une erreur qui indique le fichier et le champ en cause. Le site en ligne reste alors inchangé.

> Pour l'instant, la page d'accueil n'affiche pas encore la liste des projets : ce sera fait lors de la prochaine étape.

## Publier

**Le plus simple : demander à Claude Code** (« publie les modifications »). Il vérifie que le site se construit sans erreur, puis l'envoie sur GitHub.

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
  config.ts              Lien de rendez-vous, e-mail de contact
  i18n/fr.ts, en.ts      Tous les textes, en français et en anglais
  content/projets/       Les projets (un fichier par projet et par langue)
  styles/global.css      Couleurs, polices et éléments du design
  components/            Morceaux de page (en-tête, pied de page, accroche…)
  pages/                 Les pages : / et /mentions-legales/, /en/ et /en/legal/
public/
  CNAME                  Nom de domaine (cambon.ai) pour GitHub Pages
  favicon.svg            Icône de l'onglet
  robots.txt             Consignes pour les moteurs de recherche
.github/workflows/       Publication automatique
```
