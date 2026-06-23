## Équipe `Teapot Studio`

<dl>
<dt>Cheffe projet</dt>
<dd>DUBIEF Émilie</dd>
</dl>

**Membres**
- RASTELLI Maxime
- KUS Ali
- RAYOT Nils
- RIONDET Flavien
- FRANCOU Eddy
- ROSTAGNAT Aline

---

# Notadomus

NotaDomus est une application web permettant de naviguer parmi les différentes
**Maisons d'Illustres** réparties à travers la France. Ce sont principalement des bâtiments ayant
reçu ou ayant un quelconque rapport avec des artistes, auteurs, inventeurs, etc.

Ceci consiste en une carte interactive utilisant l'API Google Maps. Il est aussi possible
de filtrer les maisons et de les sélectionner en utilisant le panneau de gauche. Enfin, la dimension
sociale est accessible à partir du panneau de droite. Celui-ci permet de voir sa liste d'amis,
d'en ajouter, de les supprimer...

Dans la barre de navigation située en haut, il est possible d'effectuer une recherche par mots-clés.
Il est possible de retrouver une Maison d'Illustre à partir du nom de l'illustre en question,
ou même avec le nom d'une de ses oeuvres.

Ce dépôt est organisé comme suit :

```console
rendus
├── controller
├── data
├── docs
├── framework
├── log
├── model
├── public
│   ├── api
│   └── design
│       └── img
├── test
│   └── nonUnit
└── view
    ├── back-up
    └── script
```

Il reprend la structure **MVC** avec routeur. C'est à dire que le seul fichier dont doit faire
objet une requête est `index.php`, situé à la racine du projet. Un nom de contrôleur est spécifié
dans la query-string. `index.php` va charger le script de la partie `controller` correspondant à
ce nom.

Le contrôleur récupère les valeurs nécessaires dans le tableau `$_POST` ou `$_GET`. Ensuite, il
appelle des méthodes de la partie `model` pour calculer la valeur des données à caractère
dynamique qu'il faudra afficher. Enfin, il charge une vue pertinente de la partie `view`.
Les vues sont des fichiers composés quasi-exclusivement de HTML. Les seuls "morceaux" de code PHP
permettent d'intégrer les données produites par le contrôleur en amont, ou d'afficher des structures
en prenant en compte une condition.

Certaines vues intègrent des fichiers Javascript. Ceux-ci ajoutent un comportement qui s'exécutera
sur le client à la suite du chargement du fichier ou de l'appui sur un bouton.