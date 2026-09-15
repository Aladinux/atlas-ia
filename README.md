# Atlas IA

Cartographie interactive en français : **10 domaines, 154 concepts, 242 relations, 4 niveaux et 28 références**.

Arborescence navigable, graphe centré sur un concept et index. Recherche globale, filtres combinables, légende, fiches synthétiques avec références, signets locaux et liens directs. Navigation au clavier et affichage adapté au mobile.

## Déploiement GitHub Pages

Ce projet est destiné au dépôt public `Aladinux/atlas-ia`. Le site et ses sources sont publics, conformément à l’autorisation du propriétaire.

1. Dans **Settings → Pages → Build and deployment → Source**, choisir **GitHub Actions**.
2. Le workflow `.github/workflows/pages.yml` construit, valide et déploie `dist/` à chaque push sur `main`. Il peut aussi être lancé depuis **Actions → Deploy Atlas IA to GitHub Pages → Run workflow**.
3. L’URL attendue après un déploiement réussi est `https://aladinux.github.io/atlas-ia/`.

Les chemins des ressources sont relatifs pour fonctionner sous `/atlas-ia/`. Les liens directs utilisent le fragment d’URL et restent valides après rechargement.

## Exécution locale

Node.js 22 ou supérieur. Aucune dépendance de production.

```sh
npm run build
python3 -m http.server 4173 --directory dist
```

Ouvrir `http://localhost:4173/`. Le build contrôle les identifiants, les parents, les cycles, les fiches, les références et les extrémités des relations.

## Validation ergonomique

```sh
npm install
npx playwright install chromium
npm run build
npm test
```

Les essais Playwright servent volontairement le site sous `/atlas-ia/` et vérifient les chemins des ressources, la recherche, les filtres, le graphe, les fiches, les signets, les raccourcis, les liens directs et les formats mobiles 390 et 320 px. Rapport et captures : `qa-output/`.

Une installation Chromium existante peut être utilisée avec `ATLAS_CHROMIUM_EXECUTABLE` ; `ATLAS_CHROMIUM_ARGS` accepte un tableau JSON d’arguments. `ATLAS_QA_URL` permet de tester une instance déployée.

## Périmètre éditorial

Version datée du 15 septembre 2026. Sélection pédagogique de concepts et de relations, sans classement des fournisseurs. Les appartenances principales servent à la navigation et les liens transversaux expriment leur contexte. Les fiches sont des synthèses originales appuyées sur des publications de recherche et des documentations officielles, dont W3C, NIST et OWASP.

Les signets sont enregistrés dans le navigateur sur cet appareil. Aucune télémétrie applicative ni ressource distante intégrée. La carte ne se met pas à jour automatiquement.

Configuration d’hébergement : [documentation GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
