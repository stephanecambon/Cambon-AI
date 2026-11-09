---
translationOf: preuves-robotique
title: "Proving that a robot cannot reach its target"
image: "preuves-robotique"
imageAlt: "Silhouettes of the KUKA iiwa7 arm: the start and goal poses are free, but every intermediate pose hits the shelf."
kicker: "Hard problems · Robotics · Research"
category: difficile
summary: "A research project that produces independently checkable mathematical proofs that a robot motion is impossible."
problem: "To plan a robot's motion, you search for a collision-free path. When you find one, all is well. When you don't, you can't tell whether no such path exists or whether you simply haven't searched long enough. This was already the problem that resisted during my PhD, in 2005. In industry, that uncertainty is costly: you don't know whether to keep searching, move the robot or redesign the cell layout."
approach:
  - text: "Reframe the question: instead of searching for a path, search for a proof that no path exists."
  - text: "Build the method and the demonstrator, on the model of a real 7-joint industrial arm (KUKA iiwa7)."
  - text: "Make every proof independently checkable: a small, separate program, using exact arithmetic, checks each proof without trusting the method that produced it."
  - text: "Go further on guarantees: a second checker, written in Lean, whose own correctness is formally proven."
result: "Impossibility proofs checked by two independent verifiers, and an open-access paper with the code."
resultHighlight: "checked by two independent verifiers"
transferable: "Knowing for certain that something is impossible can be worth as much as finding a solution: validating a workshop layout before investing, guaranteeing that a robot cannot reach a dangerous zone, avoiding weeks of fruitless search. More broadly, this is how I work with AI: it produces, and we build the means to check that what it produces is right."
links:
  - label: "The paper and the code"
    url: "https://github.com/stephanecambon/no-plan"
  - label: "What 3 days of scientific research with an AI taught me about our future (in French)"
    url: "https://www.linkedin.com/pulse/ce-que-3-jours-de-recherche-scientifique-avec-une-ia-mont-cambon-vhpfe/"
  - label: "Episode 2: verification in Lean (in French)"
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7515346432187494401/"
cardProblem: "Knowing for certain that a robotic arm cannot reach an object."
cardApproach: "Checkable mathematical proofs, on a 7-joint industrial arm."
cardResult: "Open-access paper"
seoTitle: "Robotics: proving a motion is impossible · Cambon AI"
seoDescription: "Independently checkable mathematical proofs that an industrial robotic arm cannot reach an object. Open-access paper and code."
order: 3
---
