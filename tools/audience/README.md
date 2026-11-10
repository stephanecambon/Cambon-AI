# Mesure d'audience : script Google Apps Script

Ce dossier contient le script qui reçoit la mesure d'audience du site et la range dans un tableur Google Sheets privé, sur le compte Google Workspace de Cambon AI (stephane@cambon.ai). Il fonctionne comme celui de la newsletter (`tools/newsletter`), mais dans un projet et un tableur séparés.

- `Code.gs` : le script complet, à copier dans Google Apps Script.
- Aucun cookie. Le site envoie deux sortes d'événements :
  - **vue** : une page s'affiche ;
  - **fin** : le visiteur quitte la page ou change d'onglet, avec le temps passé sur la page.
- Le tableur reçoit une ligne par événement : `horodatage`, `type`, `visite`, `vue`, `page`, `langue`, `provenance`, `provenance_brute`, `utm_source`, `utm_medium`, `utm_campaign`, `appareil`, `duree_s`. Ni adresse IP, ni navigateur.
- Les données sont conservées 13 mois au plus (voir l'étape 6).

## Mise en place (une seule fois)

### 1. Créer le tableur

1. Ouvrez https://drive.google.com, connecté avec **stephane@cambon.ai**.
2. **Nouveau › Google Sheets › Feuille de calcul vierge**.
3. Renommez-le (en haut à gauche) : **Cambon AI · Audience**.
4. Ne le partagez avec personne : il reste privé.

### 2. Coller le script

1. Dans le tableur : **Extensions › Apps Script**. Un éditeur s'ouvre dans un nouvel onglet.
2. En haut à gauche, cliquez sur « Projet sans titre » et renommez-le **Audience cambon.ai**.
3. Dans le fichier `Code.gs` de l'éditeur, sélectionnez tout le contenu (Cmd + A) et supprimez-le.
4. Collez le contenu complet du fichier `tools/audience/Code.gs` de ce dépôt.
5. Enregistrez (icône disquette, ou Cmd + S).

### 3. Créer les onglets

1. Dans la liste des fonctions, en haut de l'éditeur, choisissez **setup**, puis cliquez sur **Exécuter**.
2. La première fois, Google demande une autorisation :
   - cliquez sur **Examiner les autorisations**, puis choisissez **stephane@cambon.ai** ;
   - Google liste les autorisations demandées : lire et modifier **ce** tableur uniquement ;
   - cliquez sur **Autoriser**.
3. Dans le tableur, deux onglets apparaissent :
   - **Événements** : les données brutes, une ligne par événement ;
   - **Tableau de bord** : les statistiques des 30 derniers jours. Tant que personne n'est venu, les tableaux n'affichent que leurs intitulés.

   Un troisième onglet, `_visites`, est masqué : il sert aux calculs. Ne le modifiez pas.

### 4. Déployer en application web

1. En haut à droite : bouton bleu **Déployer › Nouveau déploiement**.
2. À côté de « Sélectionner le type », cliquez sur la roue dentée, puis **Application Web**.
3. Remplissez :
   - **Description** : `Audience v1`
   - **Exécuter en tant que** : **Moi (stephane@cambon.ai)**
   - **Qui a accès** : **Tout le monde**
4. Cliquez sur **Déployer**.

### 5. Récupérer l'adresse

1. La fenêtre de déploiement affiche l'**URL de l'application Web**, qui se termine par `/exec`. Copiez-la.
2. Vérification : ouvrez cette adresse en ajoutant `?format=json` à la fin. La page doit afficher `{"ok":true,"service":"audience"}`.
3. Collez l'adresse dans `src/config.ts`, dans `AUDIENCE_URL`, puis publiez le site. Tant que `AUDIENCE_URL` est vide, rien n'est mesuré.

### 6. Programmer la purge mensuelle (13 mois)

La fonction **purge** supprime les événements de plus de 13 mois. Pour qu'elle se lance seule chaque mois :

1. Dans l'éditeur Apps Script, menu de gauche : icône du réveil, **Déclencheurs**.
2. En bas à droite : **Ajouter un déclencheur**.
3. Remplissez :
   - **Fonction à exécuter** : `purge`
   - **Déploiement** : `Head`
   - **Source de l'événement** : **Déclencheur horaire**
   - **Type de déclencheur** : **Minuteur mensuel**
   - **Jour du mois** : `1`
   - **Heure** : par exemple `3 h à 4 h`
4. Cliquez sur **Enregistrer**. Google peut redemander l'autorisation : acceptez.

En cas d'échec, Google vous prévient par e-mail.

## Lire le tableau de bord

Tous les tableaux portent sur les **30 derniers jours** et se mettent à jour seuls. Une nouvelle provenance, source ou campagne y apparaît automatiquement, sans rien toucher.

- **Visites par jour.**
- **Visites par source.** La source est le `utm_source` du lien s'il existe, sinon la provenance. Une visite venue d'un lien de la newsletter compte donc « newsletter », même si le visiteur a cliqué depuis Gmail.
- **Visites par provenance.** C'est le site d'où vient le visiteur, regroupé par grandes familles : linkedin, google, gmail, x… Deux valeurs particulières :
  - « direct » : adresse tapée, favori, ou lien depuis une application qui ne transmet pas sa provenance ;
  - « interne » : visite commencée sur cambon.ai.
- **Visites par utm_source et utm_campaign.**
- **Pages vues par page.**
- **Durée d'une visite**, en secondes. C'est le temps où la page est réellement visible à l'écran, additionné sur toutes les pages de la visite. Elle est donnée au total et par source, en médiane et en moyenne. La médiane est plus fiable : quelques visites très longues ne la faussent pas.
- **Part mobile / ordinateur.** Une fenêtre de moins de 760 px de large compte comme mobile.

« (aucune) » signifie que la valeur est vide, par exemple pour une visite sans `utm_source`.

**Quelques visites sont invisibles**, et c'est voulu. Le site ne mesure pas les visiteurs qui :
- envoient le signal **Global Privacy Control** ou **Do Not Track** ;
- ont cliqué sur « Ne pas être mesuré » dans la page Confidentialité ;
- sont des robots qui se déclarent comme tels.

## Suivre une campagne (liens utm)

Ajoutez des paramètres à la fin des liens que vous publiez, par exemple dans la newsletter :

`https://cambon.ai/?utm_source=newsletter&utm_medium=email&utm_campaign=2026-12`

Pour un post LinkedIn, ce serait plutôt `utm_source=linkedin&utm_medium=social&utm_campaign=…`.

## Ajouter une règle de provenance

En haut de `Code.gs`, la table `PROVENANCES` regroupe les sites d'origine. Chaque ligne a la forme `['domaine', 'nom affiché']` :

- `'linkedin.com'` vaut aussi pour ses sous-domaines (fr.linkedin.com…) ;
- `'google.*'` vaut pour toutes les extensions de pays (google.fr, google.co.uk…) ;
- la première règle qui correspond l'emporte.

Les préfixes www., m., l. et lm. sont retirés avant la comparaison. Un site absent de la table apparaît sous son propre nom de domaine.

Pour ajouter une règle :
1. ajoutez la ligne dans le dépôt, puis recopiez le fichier dans Apps Script ;
2. publiez une nouvelle version (voir ci-dessous).

La règle ne s'applique qu'aux nouveaux événements. La colonne `provenance_brute` garde toujours le domaine d'origine.

### Règles privées (hors du dépôt)

Certaines règles ne doivent pas figurer dans ce dépôt public, par exemple le regroupement sous un seul nom des visites venues d'assistants IA. On les écrit directement dans Apps Script :

1. Dans l'éditeur Apps Script, menu de gauche : icône de la roue dentée, **Paramètres du projet**.
2. En bas : **Propriétés du script › Ajouter une propriété de script**.
3. **Propriété** : `PROVENANCES_SUPPLEMENTAIRES`
4. **Valeur** : les règles, séparées par des points-virgules, au format `domaine=nom`. Par exemple : `exemple.com=exemple; autre-exemple.fr=exemple`
5. Cliquez sur **Enregistrer les propriétés du script**.

Ces règles passent avant celles de la table `PROVENANCES`, et elles suivent les mêmes conventions : sous-domaines compris, `*` pour l'extension de pays. Elles s'appliquent immédiatement, sans nouvelle version du script.

## Modifier le script plus tard

Pour garder la même adresse : **Déployer › Gérer les déploiements**, crayon, **Version : Nouvelle version**, puis **Déployer**.
Ne faites pas « Nouveau déploiement » : cela crée une nouvelle adresse, qu'il faudrait reporter dans `src/config.ts`.

Si les formules du tableau de bord changent dans `Code.gs`, relancez **setup** après avoir collé le script. Les événements ne sont jamais effacés : seuls les onglets « Tableau de bord » et `_visites` sont recréés.

## Si « Tout le monde » est absent au déploiement

Voir la même section dans `tools/newsletter/README.md` : le réglage de la console d'administration est commun aux deux scripts.

## Comment ça marche

- À chaque page, le site envoie un événement « vue ».
- Quand la page passe en arrière-plan ou se ferme, il envoie un événement « fin » avec le temps de visibilité cumulé, en secondes. Plusieurs « fin » peuvent arriver pour une même page : le tableau de bord ne garde que la plus grande valeur.
- Un identifiant de **visite**, tiré au hasard, relie les pages d'une même visite. Il est gardé dans l'onglet du navigateur (`sessionStorage`) et effacé à sa fermeture. Une nouvelle visite commence quand le visiteur arrive depuis un autre site.
- Le script n'accepte que les champs connus, tronque chaque valeur à 200 caractères et ignore le reste. Il n'enregistre ni l'adresse IP ni le navigateur.
- Les envois partent sans aucun cookie : même un visiteur connecté à son compte Google n'est pas reconnaissable par Google à travers cette mesure.
- Garde-fous contre les fausses données :
  - un événement est refusé si la page n'est pas une adresse du site, ou si la provenance n'est pas « direct », « interne » ou un simple nom de domaine ;
  - les paramètres utm ne gardent que lettres, chiffres, espaces, tirets, « _ » et « + » ;
  - au plus 10 000 événements par jour et 400 000 lignes en tout (`MAX_EVENTS_PER_DAY` et `MAX_ROWS` en haut de `Code.gs`). Au-delà, les événements sont ignorés.
- Les liens qui apparaissent dans le tableur (noms de domaine) viennent des visiteurs : ne cliquez pas dessus.
