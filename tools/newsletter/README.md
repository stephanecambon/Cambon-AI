# Newsletter : script Google Apps Script

Ce dossier contient le script qui reçoit les inscriptions du formulaire du site et les range dans un tableur Google Sheets privé, sur le compte Google Workspace de Cambon AI (stephane@cambon.ai).

- `Code.gs` : le script complet, à copier dans Google Apps Script.
- Le tableur ne contient que : `date`, `email`, `langue`, `page`, `consentement`. Ni adresse IP, ni navigateur.

## Mise en place (une seule fois)

### 1. Créer le tableur

1. Ouvrez https://drive.google.com, connecté avec **stephane@cambon.ai**.
2. **Nouveau › Google Sheets › Feuille de calcul vierge**.
3. Renommez-le (en haut à gauche) : **Cambon AI · Inscriptions newsletter**.
4. Ne le partagez avec personne : il reste privé.

### 2. Coller le script

1. Dans le tableur : **Extensions › Apps Script**. Un éditeur s'ouvre dans un nouvel onglet.
2. En haut à gauche, cliquez sur « Projet sans titre » et renommez-le **Newsletter cambon.ai**.
3. Dans le fichier `Code.gs` de l'éditeur, sélectionnez tout le contenu (Cmd + A) et supprimez-le.
4. Collez le contenu complet du fichier `tools/newsletter/Code.gs` de ce dépôt.
5. Enregistrez (icône disquette, ou Cmd + S).

### 3. Déployer en application web

1. En haut à droite : bouton bleu **Déployer › Nouveau déploiement**.
2. À côté de « Sélectionner le type », cliquez sur la roue dentée, puis **Application Web**.
3. Remplissez :
   - **Description** : `Formulaire newsletter v1`
   - **Exécuter en tant que** : **Moi (stephane@cambon.ai)**
   - **Qui a accès** : **Tout le monde**
4. Cliquez sur **Déployer**.

Si l'option « Tout le monde » n'apparaît pas, voir « Problème : l'option Tout le monde est absente » plus bas.

### 4. Autoriser le script

1. Google affiche « Autoriser l'accès » : cliquez dessus, puis choisissez **stephane@cambon.ai**.
2. Google liste les autorisations demandées : lire et modifier **ce** tableur uniquement. Cliquez sur **Autoriser**.
3. Facultatif, pour créer tout de suite les en-têtes : dans l'éditeur, choisissez la fonction **setup** dans la liste en haut, puis **Exécuter**. Un onglet « Inscriptions » apparaît dans le tableur, avec les cinq colonnes. Sinon, il est créé à la première inscription.

### 5. Récupérer l'adresse

1. La fenêtre de déploiement affiche l'**URL de l'application Web**, qui se termine par `/exec`. Copiez-la.
2. Vérification : ouvrez cette adresse en ajoutant `?format=json` à la fin. La page doit afficher `{"ok":true,"service":"newsletter"}`.
3. Collez l'adresse dans `src/config.ts`, dans `NEWSLETTER_URL`. (Déjà fait le 9 novembre 2026 : à refaire seulement si l'adresse change.)

## Modifier le script plus tard

Pour garder la même adresse : **Déployer › Gérer les déploiements**, crayon, **Version : Nouvelle version**, puis **Déployer**.
Ne faites pas « Nouveau déploiement » : cela crée une nouvelle adresse, qu'il faudrait reporter dans `src/config.ts`.

Si le texte de la case de consentement change sur le site : changez `NEWSLETTER_CONSENT_VERSION` dans `src/config.ts` (par ex. `v2-2027-01`), ajoutez la même valeur dans `CONSENT_VERSIONS` en haut de `Code.gs`, puis publiez une nouvelle version du script.

## Problème : l'option « Tout le monde » est absente

C'est un réglage de la console d'administration Google Workspace, qui interdit le partage en dehors de cambon.ai. Pour le modifier (compte administrateur) :

1. Ouvrez https://admin.google.com.
2. **Applications › Google Workspace › Drive et Docs › Paramètres de partage › Options de partage**.
3. **Partage en dehors de cambon.ai** : **Activé**.
4. Cochez l'option qui permet aux utilisateurs de cambon.ai de rendre des fichiers et du **contenu Web publié** visibles par **toute personne disposant du lien**.
5. Enregistrez. La prise en compte peut prendre de quelques minutes à 24 heures. Revenez ensuite à l'étape 3.

Les libellés exacts peuvent varier légèrement selon la version de la console.

## Comment ça marche

- **Avec JavaScript** (cas normal) : le site envoie le formulaire en arrière-plan. Il reçoit une réponse JSON, puis affiche le message sur place.
- **Sans JavaScript** : le navigateur envoie le formulaire directement au script, qui affiche une petite page de confirmation dans la langue du visiteur, avec un lien de retour vers le site.
- **Robots** : le script ne note rien, mais affiche quand même le message de succès, dans deux cas :
  - un champ piège invisible a été rempli ;
  - le formulaire a été envoyé moins de 3 secondes après l'affichage de la page.
- **Doublons** : une adresse déjà inscrite n'est pas ajoutée une seconde fois. Le message de succès est le même, pour ne pas révéler qui est inscrit.
- **Consentement** : sans la case cochée, le navigateur bloque l'envoi, et le script refuse aussi.
