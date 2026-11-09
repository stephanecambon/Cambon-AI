---
title: "Prouver qu'un robot ne peut pas atteindre sa cible"
kicker: "Problèmes difficiles · Robotique · Recherche"
category: difficile
summary: "Un travail de recherche qui produit des preuves mathématiques, vérifiables indépendamment, qu'un mouvement de robot est impossible."
problem: "Pour planifier le mouvement d'un robot, on cherche un chemin sans collision. Quand on en trouve un, tout va bien. Quand on n'en trouve pas, on ne sait pas si ce chemin n'existe pas, ou si l'on n'a simplement pas assez cherché. C'était déjà le problème qui résistait pendant ma thèse, en 2005. Dans l'industrie, cette incertitude coûte cher : on ne sait pas s'il faut chercher plus longtemps, déplacer le robot ou revoir l'implantation de la cellule."
approach:
  - text: "Reformuler la question : au lieu de chercher un chemin, chercher une preuve qu'aucun chemin n'existe."
  - text: "Construire la méthode et le démonstrateur, sur le modèle d'un bras industriel réel à 7 articulations (KUKA iiwa7)."
  - text: "Rendre chaque preuve vérifiable indépendamment : un petit programme séparé, en calcul exact, contrôle chaque preuve sans faire confiance à la méthode qui l'a produite."
  - text: "Aller plus loin dans la garantie : un second vérificateur, écrit en Lean, dont la correction est elle-même démontrée formellement."
result: "Des preuves d'impossibilité contrôlées par deux vérificateurs indépendants, et un papier en accès libre avec le code."
resultHighlight: "contrôlées par deux vérificateurs indépendants"
transferable: "Savoir avec certitude qu'une chose est impossible vaut parfois autant que trouver une solution : valider l'implantation d'un atelier avant d'investir, garantir qu'un robot ne peut pas atteindre une zone dangereuse, éviter des semaines de recherche vaine. Plus largement, c'est ma façon de travailler avec l'IA : elle produit, et l'on construit les moyens de vérifier que ce qu'elle produit est juste."
links:
  - label: "Le papier et le code"
    url: "https://github.com/stephanecambon/no-plan"
  - label: "Ce que 3 jours de recherche scientifique avec une IA m'ont appris sur notre futur"
    url: "https://www.linkedin.com/pulse/ce-que-3-jours-de-recherche-scientifique-avec-une-ia-mont-cambon-vhpfe/"
  - label: "Épisode 2 : la vérification en Lean"
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7515346432187494401/"
cardProblem: "Savoir avec certitude qu'un bras robotique ne peut pas atteindre un objet."
cardApproach: "Des preuves mathématiques vérifiables, sur un bras industriel à 7 articulations."
cardResult: "Papier en accès libre"
seoTitle: "Robot : prouver qu'un mouvement est impossible · Cambon AI"
seoDescription: "Des preuves mathématiques, vérifiables indépendamment, qu'un bras robotique industriel ne peut pas atteindre un objet. Papier et code en accès libre."
order: 3
---
