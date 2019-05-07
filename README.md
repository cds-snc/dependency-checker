# Dependency checker
[![Phase](https://img.shields.io/badge/Phase-Beta-22a7f0.svg)](https://digital.canada.ca/products/)  [![Maintainability](https://api.codeclimate.com/v1/badges/88a373736a5d0cf45b55/maintainability)](https://codeclimate.com/github/cds-snc/dependency-checker/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/cds-snc/dependency-checker/badge.svg)](https://snyk.io/test/github/cds-snc/dependency-checker)

(la version française suit)

### Purpose

The purpose of this tool is to check if any of the JavaScript dependencies in your project warrant a second look.

### How do I use it?

All you need to do is install the [GitHub application](https://github.com/apps/cds-snc-dependency-checker).

### Work flow

The dependency checker is a continuous integration tool that extracts all the javascript packages listed in your `package.json` files and runs them against the tool available at [https://npms.io/](https://npms.io/). If the package score less than a **0.4** then the tool will create an issue in your repo, alerting you that you might want to review the package before using it. To learn more about the scoring criteria, you can review the documentation [here](https://npms.io/about).

### Implementation

The tool is built as a Google Cloud function that hooks into push events sent by GitHub. Any merges to master are automatically deployed after testing passes using Google's Cloud build service (check cloudbuild.yaml for more information). 

When a push event is sent it checks to see if any `package.json` files have been added or modified. If they have, it extracts all the packages and runs them against the [https://npms.io/](https://npms.io/) API. Any packages returning a score less than **0.4** are flagged and compared to a list of previously flagged packages. If the package has not been flagged previously, the tool creates an issue in the repo for consideration and saves the package for the future inside a Google Firestore database. This ensures that the same package is not flagged twice.

### Questions?

Please contact us through any of the multiple ways listed on our [website](https://digital.canada.ca/).



# Vérificateur des dépendances


### Objet

Cet outil a pour but de vérifier si les dépendances JavaScript dans votre projet nécessitent un second examen.
Comment l’utiliser?
Vous n’avez qu’à installer l’application GitHub.

### Déroulement du travail

L’outil de vérification des dépendances est un outil d’intégration continue qui extrait tous les progiciels javascript énumérés dans vos fichiers package.json et les exécute à l’aide de l’outil disponible à l’adresse https://npms.io/. Si le score du progiciel est inférieur à 0,4, alors l’outil créera un problème dans votre dépôt (repository), pour vous aviser d’examiner le progiciel avant de l’utiliser. Pour en savoir plus sur les critères de notation, vous pouvez consulter la documentation ici.

### Mise en œuvre

L’outil est conçu comme une fonction Google Cloud qui s’insère dans les événements de poussée (push events) envoyés par GitHub. À la réussite des tests, toutes les fusions sont automatiquement déployées à l’aide du service Cloud Build de Google (voir cloudbuild.yaml pour plus d’information).

Lorsqu’un événement de poussée est envoyé, il vérifie si des fichiers package.json ont été ajoutés ou modifiés. S’ils l’ont été, il extrait tous les progiciels et les exécute à l’aide de l’interface de programmation d’applications (API) https://npms.io/. Tous les progiciels dont le score est inférieur à 0,4 sont marqués et comparés à une liste de progiciels déjà marqués. Si le progiciel n’a pas été marqué précédemment, l’outil crée un problème dans le dépôt en vue d’un examen et sauvegarde le progiciel pour l’avenir dans une base de données Google Firestore. Cette procédure permet d’éviter que le même progiciel ne soit marqué deux fois.

### Avez-vous des questions?

Veuillez communiquer avec nous par l’un des multiples moyens indiqués sur notre site Web.
