# Modifier le site de L'Atelier 105

Vous pouvez changer vous-même les textes, prix, horaires, actualités, photos et le menu du site,
depuis votre navigateur, sans rien installer. Rien n'est en ligne tant que vous n'avez pas cliqué sur **Publier**.

## En bref

1. Ouvrez **https://l-atelier105website.vercel.app/_studio** et connectez-vous avec GitHub.
2. Choisissez la page à gauche (ou naviguez sur le site : l'éditeur suit).
3. Modifiez les champs : le site se met à jour en direct et la zone modifiée est **entourée en orange**.
4. Cliquez sur **Publier** : le site en ligne est à jour 1 à 2 minutes plus tard.

---

## 1. Ouvrir l'éditeur

1. Allez sur **https://l-atelier105website.vercel.app/_studio**
   (astuce : ajoutez cette page à vos favoris ou glissez-la sur votre bureau).
2. Cliquez sur **Se connecter avec GitHub** et connectez-vous avec le compte `latelier105cerans-ux`.
3. Le site s'affiche avec l'éditeur sur le côté.

## 2. Trouver ce que vous voulez modifier

Dans **Contenu**, les fichiers correspondent aux pages du site :

| Fichier | Ce qu'il contient |
|---|---|
| `accueil` | Bienvenue, actualités, APA, autres activités, à propos |
| `tarifs` | Tarifs APA, tarifs des autres activités, planning |
| `contact` | Titre, texte et formulaire de la page contact |
| `menu-et-pied-de-page` | Logo, liens du menu, bouton vert, adresse, téléphone, email, Facebook / Instagram |

- Ouvrir un fichier affiche la page correspondante. Et inversement : en cliquant dans le menu du site,
  l'éditeur ouvre le bon fichier.
- Les champs sont dans le même ordre que sur la page, de haut en bas.
- Cliquez dans un champ : le texte correspondant est **entouré en orange** sur le site, avec le nom du champ
  au-dessus, et la page défile jusqu'à lui.

## 3. Modifier

- **Textes** : tapez directement. Un retour à la ligne (touche Entrée) s'affiche aussi sur le site,
  pratique pour les listes (une ligne par « ✔ »).
- **Photos** : cliquez sur le champ de l'image, puis choisissez une image existante ou envoyez-en une nouvelle
  (JPG, PNG ou WEBP, 10 Mo maximum, idéalement environ 2000 pixels de large).
- **Listes** (actualités, activités, formules, créneaux, liens du menu) : **+** pour ajouter, la poubelle pour
  supprimer, les flèches pour changer l'ordre. Cliquez sur un élément pour l'ouvrir.
- **Masquer sans supprimer** : l'interrupteur **« Masquer sur le site »** cache une section, une activité,
  une formule, une actualité ou un lien du menu. Désactivez-le pour le remettre.

### Les actualités

Chaque actualité a un champ facultatif **« Afficher jusqu'au »**. Choisissez une date dans le calendrier :
l'actualité reste visible ce jour-là, puis disparaît toute seule le lendemain. Laissez vide pour qu'elle reste.
Si toutes les actualités sont passées ou masquées, le bloc Actualités disparaît.

### Le menu

Dans `menu-et-pied-de-page` → *Menu* → *Liens du menu*, chaque lien a un **Texte** et un **Lien** :
- `/tarifs` ou `/contact` pour une page ;
- `/#lapa` pour une section de l'accueil (`/#lespace`, `/#lapa`, `/#autres-activites`, `/#moi`) ;
- une adresse complète `https://…` pour un autre site.

Le menu du haut (ordinateur et mobile) et celui du pied de page se mettent à jour ensemble.

### Le planning

L'éditeur n'accepte pas les PDF. Exportez votre planning en **image** (PNG ou JPG, par exemple depuis Canva),
puis dans `tarifs` → *Planning*, choisissez cette image pour **Image du planning** et pour
**Fichier du planning à télécharger**.

### Google

Les deux derniers champs de chaque page (**Titre Google** et **Description Google**) ne sont pas visibles
sur la page : ils servent à l'onglet du navigateur et aux résultats de recherche Google.

## 4. Publier

1. Cliquez sur **Publier**, vérifiez la liste des changements puis **Valider**.
2. Écrivez une courte description (ex. « Nouveaux horaires pilates ») et confirmez.
3. Le site en ligne est à jour en **1 à 2 minutes**. Rechargez la page pour voir le résultat.

Tant que vous n'avez pas publié, vos modifications ne sont pas en ligne : vous pouvez essayer sans risque.

## En cas de souci

- Une erreur ? Rien n'est perdu : chaque publication est enregistrée et peut être annulée.
  Contactez votre développeur avec une capture d'écran.
- Le message **« Conflit détecté »** : le site a été mis à jour pendant que l'éditeur était ouvert.
  1. Attendez 2 minutes, puis rechargez complètement la page (Cmd + Shift + R sur Mac, Ctrl + Shift + R sur PC).
  2. Si le message reste, cliquez sur **« Annuler les changements »** sur le fichier concerné, puis refaites la modification.
