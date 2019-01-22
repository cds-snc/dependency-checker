import { searchRepo } from "./searchRepo";
import octokit from "./index";

export const getPackageJsonFile = async (payload = {}) => {
  if ((payload && !payload.commits) || (payload && !payload.commits.length)) {
    const paths = await searchRepo(octokit, payload);
    return paths ? paths[0] : false;
  }

  let result = false;

  payload.commits[payload.commits.length - 1].added.filter(item => {
    if (item.indexOf("package.json") !== -1) {
      result = item;
    }
  });

  payload.commits[payload.commits.length - 1].modified.filter(item => {
    if (item.indexOf("package.json") !== -1) {
      result = item;
    }
  });

  return result;
};

export const getPackagePath = async (
  baseUrl = "https://raw.githubusercontent.com",
  payload
) => {
  const json = await getPackageJsonFile(payload);

  if (json && payload.after) {
    return `${baseUrl}/${payload.repository.full_name}/${
      payload.after
    }/${json}`;
  }

  if (json && payload.repositories) {
    return `${baseUrl}/${payload.repositories[0].full_name}/master/${json}`;
  }

  throw new Error(`No package.json file found`);
};
