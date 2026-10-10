---
title: Page modèle - tous les blocs
description: Exemple de chaque bloc, à dupliquer pour créer une nouvelle page.
masquer: true
---

::bienvenue{image="/img-hero.svg"}
# Le titre de votre page

Une phrase d'introduction : de quoi parle cette page ? Cette page modèle est cachée aux visiteurs. Dupliquez-la pour créer une nouvelle page, puis gardez seulement les blocs utiles.

  :::bouton{lien="/contact"}
  Me contacter
  :::

  :::bouton{lien="/tarifs" apparence="contour"}
  Voir les tarifs
  :::
::

::section-page
#### Sur-titre (Titre 4)

## Une section avec une grille de cartes

Un texte d'introduction. Dans une section, vous pouvez écrire librement puis insérer d'autres blocs avec la touche « / ».

  :::grille{colonnes="3"}
    ::::carte{icon="i-lucide-heart-pulse"}
    ### Première carte

    Un court texte. Choisissez l'icône dans les réglages de la carte.
    ::::

    ::::carte{icon="i-lucide-calendar-days"}
    ### Deuxième carte

    - Une liste
    - à puces
    ::::

    ::::carte{icon="i-lucide-users"}
    ### Troisième carte

    Un texte avec du **gras** et un [lien](/contact).
    ::::
  :::
::

::texte-image{image="/img_pilates.png" fond="beige"}
## Un texte à côté d'une photo

Choisissez la photo et son côté (droite ou gauche) dans les réglages du bloc.

  :::bouton{lien="/tarifs" apparence="lien"}
  Un lien avec une flèche
  :::
::

::section-page{fond="vert-clair"}
## Questions fréquentes

  :::faq
    ::::question
    ### Faut-il une prescription médicale ?

    La réponse s'écrit sous la question (Titre 3). Elle s'affiche quand le visiteur clique sur la question.
    ::::

    ::::question
    ### Que dois-je apporter ?

    Une tenue confortable, une bouteille d'eau et une serviette.
    ::::
  :::
::

::section-page
## Ils en parlent

  :::grille{colonnes="3"}
    ::::temoignage{nom="Marie" precision="Pilates depuis 2024" photo="/img_lou-anne.png"}
    Un témoignage de cliente, en quelques phrases.
    ::::

    ::::temoignage{nom="Jean" precision="APA"}
    Un autre témoignage. La photo est facultative.
    ::::

    ::::temoignage{nom="Sophie"}
    Un troisième témoignage.
    ::::
  :::
::

::section-page{fond="blanc"}
## Galerie photos

  :::grille{colonnes="3"}
    ::::photo{image="/img_pilates.png"}
    Une légende (facultative)
    ::::

    ::::photo{image="/img_circuit_training.png"}
    Le circuit-training
    ::::

    ::::photo{image="/img_food.png"}
    Un atelier cuisine
    ::::
  :::
::

::bandeau{fond="vert"}
## Envie de commencer ?

Un bandeau coloré pour mettre un message en avant.

  :::bouton{lien="/contact" apparence="clair"}
  Réserver une séance
  :::
::

::espace{taille="petit" ligne}
::

::localisation{adresse="105 Rue nationale, 72330 Cérans-Foulletourte"}
## Venir à l'Atelier

**105 Rue nationale**\
72330 Cérans-Foulletourte

Le plan se règle avec l'adresse dans les réglages du bloc.
::
