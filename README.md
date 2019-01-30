# Dependency checker

[![Maintainability](https://api.codeclimate.com/v1/badges/88a373736a5d0cf45b55/maintainability)](https://codeclimate.com/github/cds-snc/dependency-checker/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/cds-snc/dependency-checker/badge.svg)](https://snyk.io/test/github/cds-snc/dependency-checker)

The dependency checker is a continuous integration tool that extracts all the javascript packages listed in your `package.json` files and runs them against the tool available at [https://npms.io/](https://npms.io/). If the package score less than a **0.4** then the tool will create an issue in your repo, alerting you that you might want to review the package before using it. To learn more about the scoring criteria, you can review the documentation [here](https://npms.io/about).
 
## How does it work?

The tool is built as a cloud function that hooks into push events sent by GitHub. When a push event it sent it checks to see if any `package.json` files have been added or modified. If they have, it extracts all the packages and runs them against the [https://npms.io/](https://npms.io/) API. Any packages returning a score less than **0.4** are flagged and compared to a list of previously flagged packages. If the package has not be flagged previously, the tool creates an issue in the repo for consideration and saves the package for the future. 
