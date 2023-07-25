# UA-front

[![Build Status](https://github.com/ungdev/UA-front/actions/workflows/ci.yml/badge.svg)](https://github.com/ungdev/UA-api/actions)
[![Read the Docs](https://readthedocs.org/projects/ua/badge/?version=latest&style=flat)](https://ua.readthedocs.io/)

Nouvelle version du site de l'UTT Arena ([https://arena.utt.fr](https://arena.utt.fr)).

**Avant toute chose**, prenez connaissance de [la documentation](https://ua.readthedocs.io).

## Pré-requis

- [Pnpm](https://pnpm.io/)

## Installation

### Clonage et installation des dépendences

```
git clone https://github.com/ungdev/UA-front.git
cd UA-front
pnpm install
```

### Modification de la configuration

Il faut créer un fichier .env en se basant sur .env.example, puis il suffira de le modifier en fonction de l'utilisation.

```
cp .env.example .env
```

## Scripts disponibles

- `pnpm dev` : permet de lancer une version locale de développement
- `pnpm build` : permet de build l'application
- `pnpm start` : permet de servir le build
- `pnpm lint` : permet d'afficher les recommendations de formatage du code
- `pnpm lint:fix` : permet de corriger le formatage du code
- `pnpm docs` : permet de lancer une version locale de Storybook pour visualiser la documentation des composants
- `pnpm docs:build` : permet de générer la documentation des composants via Storybook. La documentation est générée dans le dossier `docs`
- `pnpm test` : permet de lancer les tests unitaires
- `pnpm test:watch` : permet de lancer les tests unitaires en mode watch
- `pnpm test:coverage` : permet de lancer les tests unitaires et d'afficher la couverture de code
