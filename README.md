<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec ça base de données.
```
docker compose up -d
```
# Pour démarrer le frontend de l'applicatif
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
# Lancer les tests Cypress

## Prérequis supplémentaires
- L'application frontend lancée sur `http://localhost:4200`
- Le backend lancé sur `http://localhost:8081`

## Installation de Cypress
```
npm install
```

## Lancer les tests

### Interface graphique
```
npx cypress open
```

### En ligne de commande
```
npx cypress run
```
## Génération du rapport

Cypress génère automatiquement un rapport vidéo et des screenshots dans :
```
cypress/videos/
cypress/screenshots/
```

Pour générer un rapport HTML avec Mochawesome :
```
npm install --save-dev mochawesome
npx cypress run --reporter mochawesome
## Fichiers de tests
- `cypress/e2e/api.cy.ts` — Tests API backend
- `cypress/e2e/smoke_tests.cy.ts` — Smoke tests
- `cypress/e2e/xss.cy.ts` — Test sécurité XSS
- `cypress/e2e/connexion.cy.ts` — Tests fonctionnels connexion
- `cypress/e2e/panier.cy.ts` — Tests fonctionnels panier
```

