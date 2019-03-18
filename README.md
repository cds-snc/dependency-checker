# Dependency checker
[![Phase](https://img.shields.io/badge/Phase-Beta-22a7f0.svg)](https://digital.canada.ca/products/)  [![Maintainability](https://api.codeclimate.com/v1/badges/88a373736a5d0cf45b55/maintainability)](https://codeclimate.com/github/cds-snc/dependency-checker/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/cds-snc/dependency-checker/badge.svg)](https://snyk.io/test/github/cds-snc/dependency-checker)

### Purpose

The purpose of this tool is to check if any of the JavaScript dependencies in your project warrant a second look.

### How do I use it?

All you need to do is install the GitHub application found here: _Coming soon!_

### Work flow

The dependency checker is a continuous integration tool that extracts all the javascript packages listed in your `package.json` files and runs them against the tool available at [https://npms.io/](https://npms.io/). If the package score less than a **0.4** then the tool will create an issue in your repo, alerting you that you might want to review the package before using it. To learn more about the scoring criteria, you can review the documentation [here](https://npms.io/about).

### Implementation

The tool is built as a Google Cloud function that hooks into push events sent by GitHub. Any merges to master are automatically deployed after testing passes using Google's Cloud build service (check cloudbuild.yaml for more information). 

When a push event it sent it checks to see if any `package.json` files have been added or modified. If they have, it extracts all the packages and runs them against the [https://npms.io/](https://npms.io/) API. Any packages returning a score less than **0.4** are flagged and compared to a list of previously flagged packages. If the package has not been flagged previously, the tool creates an issue in the repo for consideration and saves the package for the future inside a Google Firestore database. This ensures that the same package is not flagged twice.

### Questions?

Please contact us through any of the multiple ways listed on our [website](https://digital.canada.ca/).
