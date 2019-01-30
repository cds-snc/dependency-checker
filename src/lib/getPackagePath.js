import { searchRepo } from "./searchRepo";
import octokit from "./index";

export const getPackageJsonFile = async (payload = {}) => {
  if (payload && !payload.commits) {
    return searchRepo(octokit, payload);
  }

  let results = [];

  payload.commits[payload.commits.length - 1].added.filter(item => {
    if (item.indexOf("package.json") !== -1) {
      results.push(item);
    }
  });

  payload.commits[payload.commits.length - 1].modified.filter(item => {
    if (item.indexOf("package.json") !== -1) {
      results.push(item);
    }
  });

  return results;
};

export const getPackagePath = async (
  baseUrl = "https://raw.githubusercontent.com",
  payload
) => {
  const json = await getPackageJsonFile(payload);

  if (payload.after) {
    return json.map(
      file =>
        `${baseUrl}/${payload.repository.full_name}/${payload.after}/${file}`
    );
  }

  if (payload.repositories) {
    return json.map(
      file => `${baseUrl}/${payload.repositories[0].full_name}/master/${file}`
    );
  }

  return json;
};
