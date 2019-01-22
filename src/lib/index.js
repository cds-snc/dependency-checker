import octokit from "@octokit/rest";

export { getSuspicious } from "./analyzePackages.js";
export { getRepoDependencies } from "./getDeps.js";
export { createIssue } from "./issues.js";
export { queryNpms } from "./queryNpms.js";

export default octokit();
