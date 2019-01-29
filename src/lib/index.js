import octokit from "@octokit/rest";

export { createIssue } from "./issues.js";
export { getSuspicious } from "./analyzePackages.js";
export { getRepoDependencies } from "./getDeps.js";
export { loadPackages, savePackage, deleteCollection } from "./firestore.js";
export { queryNpms } from "./queryNpms.js";

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export default octokit();
