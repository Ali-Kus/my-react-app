# Guide A → Z de ton profil GitHub

> Objectif : que tu comprennes **100 % de chaque pièce**. Rien de magique, rien de copié sans savoir pourquoi.

---

## 0. Le concept de base (le truc que peu de gens savent)

Sur ton profil GitHub (`github.com/Ali-Kus`), GitHub affiche en haut le `README.md`
d'un dépôt **spécial** : un dépôt dont le **nom est exactement ton pseudo**.

> Dépôt à créer : **`Ali-Kus/Ali-Kus`** (public).

Si le nom ne correspond pas pile à ton pseudo, ça ne s'affichera pas sur le profil.

---

## 1. Ce qui est autorisé, et ce qui ne l'est PAS

Le README est du **Markdown + un sous-ensemble de HTML** que GitHub « nettoie »
(sanitize) pour des raisons de sécurité.

| Tu peux | Tu NE peux pas |
|---|---|
| Markdown complet | `<script>` (aucun JavaScript) |
| `<img>`, `<a>`, `<p align>`, tableaux | `<style>` dans le README |
| `<details>`/`<summary>` (accordéon natif) | `onclick` et autres handlers JS |
| GIF animés | classes CSS, `id` stylés |
| **SVG animés** (via `<img>`) | iframes, formulaires |

👉 **Conséquence n°1 :** « dynamique » ne veut JAMAIS dire JavaScript côté client.
Ça veut dire **une image fabriquée par un serveur** à chaque chargement de la page.

👉 **Conséquence n°2 (ton « statue en marbre ») :** le CSS est interdit *dans le
README*, mais **autorisé à l'intérieur d'un fichier `.svg`**. Donc si tu mets tes
animations CSS dans un `.svg` et que tu l'affiches avec `<img src="banner.svg">`,
**ça s'anime**. C'est exactement ce que fait `assets/banner.svg`.

---

## 2. La bannière animée — `assets/banner.svg` (ta pièce signature)

Ouvre le fichier, tout est commenté. Les points clés :

- **`<defs>`** : on y définit des dégradés (`linearGradient`) et un `clipPath`
  (coins arrondis) réutilisables.
- **`<style>` … `@keyframes`** : les animations CSS. Elles vivent DANS le SVG,
  donc GitHub les garde.
  - `fadeUp` → le texte monte en fondu
  - `blink` → le curseur `_` clignote
  - `pulse` → le point vert « disponible » respire
  - `drift` → la grille de fond glisse doucement
- **Les classes** (`.name`, `.role`, `.cursor`…) relient chaque animation à un
  élément. On décale les `delay` (0.1s, 0.4s, 0.7s) pour un effet en cascade.
- **`@media (prefers-reduced-motion: reduce)`** : si l'utilisateur a désactivé les
  animations sur son OS, tout devient statique. (Détail pro, ça montre que tu sais.)

### Pour le personnaliser
- Le texte : balises `<text class="name">Ali Kus</text>` et `class="role"`.
- Les couleurs : les `stop-color` dans `<linearGradient>`.
- Tester en local : ouvre simplement `banner.svg` dans ton navigateur.

> ⚠️ Important : les SVG affichés via `<img>` ne **chargent pas de polices
> externes** ni de JS. On reste donc sur des polices système (`Segoe UI`,
> `monospace`) — c'est volontaire et fiable.

---

## 3. Le sélecteur de langue (ta question)

**Un vrai bouton JS qui change le texte sur la même page = impossible** (pas de JS).

La solution propre, utilisée par les vrais projets multilingues :
**un fichier par langue + des drapeaux cliquables en haut.**

```
README.md       ← Français  (chargé par défaut sur le profil)
README.en.md    ← English
README.tr.md    ← Türkçe
README.ru.md    ← Русский
```

En haut de **chaque** fichier, la même rangée de « boutons » (des badges
shields.io enveloppés dans des liens `<a href="README.xx.md">`). La langue
courante est en bleu, les autres en gris :

```html
<a href="README.en.md"><img src="https://img.shields.io/badge/English-2d2d3a?style=for-the-badge"/></a>
```

Cliquer = naviguer vers l'autre fichier. Ça marche partout, sans dépendance,
pour toujours. C'est la version « artisan » du multilingue.

> Alternative *même page* : les blocs `<details><summary>Langue</summary>…</details>`
> (accordéon). C'est un vrai toggle natif sans JS, mais ça empile les langues les
> unes sous les autres au lieu de basculer. Pour un profil, l'approche multi-fichiers
> est plus propre — c'est celle qu'on a retenue.

---

## 4. Les badges de techno (`shields.io`)

Chaque badge est une simple URL d'image :
```
https://img.shields.io/badge/React-61dafb?style=flat-square&logo=react&logoColor=black
                              └─ texte ┘ └ couleur┘            └─ logo ┘   └ couleur logo ┘
```
- `style=flat-square` / `for-the-badge` : la forme.
- `logo=` : nom d'un logo (liste sur simpleicons.org).
- Avantage : zéro fichier à héberger, tu changes l'URL et c'est tout.

---

## 5. Les cartes de stats (contenu « dynamique » via service tiers)

```
https://github-readme-stats.vercel.app/api?username=Ali-Kus&...
```
C'est un **serveur tiers** (projet open-source hébergé sur Vercel) qui regarde ton
activité GitHub et **dessine une image PNG/SVG à la volée**. À chaque visite, les
chiffres sont à jour.

- ✅ Zéro entretien.
- ⚠️ Dépendance externe : si leur serveur est lent/down, la carte ne s'affiche pas.
- Paramètres utiles : `theme=tokyonight`, `hide_border=true`, `show_icons=true`.

> C'est le seul morceau qui dépend d'un tiers. Si tu veux du 100 % maison plus tard,
> on peut générer ces stats avec ta propre GitHub Action (voir §6).

---

## 6. Le snake — VRAI contenu dynamique, auto-hébergé (`.github/workflows/snake.yml`)

Ici, **pas de serveur tiers** : c'est **ta propre GitHub Action** qui fabrique le contenu.

**Comment ça marche, étape par étape :**
1. Un **cron** (`0 0 * * *`) déclenche l'action chaque jour (+ bouton manuel).
2. L'action lit ton graphe de contributions et **génère 2 fichiers SVG**
   (un clair, un sombre).
3. Elle **pousse ces SVG sur une branche dédiée `output`**.
4. Ton README pointe vers ces SVG. À chaque régénération, l'animation est à jour.

**Pour l'activer :**
1. Place `snake.yml` dans `.github/workflows/` du dépôt `Ali-Kus/Ali-Kus`.
2. Dans le dépôt : **Settings → Actions → General → Workflow permissions →
   « Read and write permissions »** (sinon le push échoue).
3. Onglet **Actions → Generate Snake Animation → Run workflow** (premier run manuel).
4. Ajoute ce bloc dans ton README (après la bannière, par ex.) :

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Ali-Kus/Ali-Kus/output/snake-dark.svg"/>
  <img src="https://raw.githubusercontent.com/Ali-Kus/Ali-Kus/output/snake.svg" alt="Snake animation"/>
</picture>
```
`<picture>` choisit automatiquement la version sombre ou claire selon le thème du
visiteur. (Encore un détail « pro ».)

---

## 7. Mise en ligne — pas à pas

```bash
# 1. Créer le dépôt sur github.com, nommé EXACTEMENT : Ali-Kus
#    (public, sans rien dedans)

# 2. En local, dans un dossier vide :
git clone https://github.com/Ali-Kus/Ali-Kus.git
cd Ali-Kus

# 3. Copier le contenu de ce dossier "github-profile/" dedans :
#    README.md, README.en.md, README.tr.md, README.ru.md,
#    assets/banner.svg, .github/workflows/snake.yml
#    (NE PAS copier GUIDE.md — il est juste pour toi)

git add .
git commit -m "Profil GitHub : README multilingue + bannière animée"
git push
```

Va sur `github.com/Ali-Kus` → ton profil est habillé. 🎉

---

## 8. Checklist de personnalisation avant publication

- [ ] Vérifier que **le pseudo est bien `Ali-Kus`** partout (stats, snake, liens).
- [ ] Ajuster la **liste des technos** pour ne montrer que ce que tu maîtrises vraiment.
- [ ] Relire les **4 traductions** (surtout TR/RU si tu veux les parfaire).
- [ ] Mettre à jour **email / LinkedIn** si besoin.
- [ ] (Optionnel) Activer le **snake** (§6).
- [ ] Tester `banner.svg` dans le navigateur pour valider le rendu animé.

---

## 9. Pour aller plus loin (idées « niveau au-dessus »)

- **README qui se réécrit tout seul** : une Action qui va chercher tes derniers
  articles de blog / vidéos (RSS) et réécrit une section du README, puis commit.
- **WakaTime** : afficher ton temps de code par langage (réel, mis à jour).
- **SVG généré par toi** : pousser le concept de la bannière jusqu'à un graphe
  de stats entièrement dessiné par ta propre Action (le 100 % maison ultime).
