import octokit from "@octokit/rest";

export { getRepoDependencies } from "./getDeps.js";
export { createIssue } from "./issues.js";

export default octokit();
