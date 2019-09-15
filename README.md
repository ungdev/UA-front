# UA-front

Nouvelle version du site de l'UTT Arena ([https://arena.utt.fr](https://arena.utt.fr)).

## Pré-requis
- [Yarn](https://yarnpkg.com/fr/)

## Installation

### Clonage et installation des dépendences
```
git clone https://github.com/ungdev/UA-front.git
cd UA-front
yarn install
```

### Modification de la configuration
Il faut créer un fichier .env en se basant sur .env.example, puis il suffira de le modifier en fonction de l'utilisation.
```
cp .env.example .env
```

## Scripts disponibles
- `yarn dev` : permet de lancer une version locale de développement
- `yarn build` : permet de build l'application
- `yarn start` : permet de servir le build
- `yarn builds-docs` : permet de générer la documentation des composants situés dans le dossier /components/UI. La documentation se situera dans le dossier /docs.
- `yarn lint` : permet d'afficher les recommendations de formatage du code
- `yarn lint-fix` : permet de corriger le formatage du code