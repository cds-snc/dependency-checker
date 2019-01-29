import octokit from "@octokit/rest";

export { createIssue } from "./issues.js";
export { getSuspicious } from "./analyzePackages.js";
export { getRepoDependencies } from "./getDeps.js";
export { loadPackages, savePackage, deleteCollection } from "./firestore.js";
export { queryNpms } from "./queryNpms.js";

export default octokit();
