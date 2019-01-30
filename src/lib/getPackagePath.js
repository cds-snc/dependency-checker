import { searchRepo } from "./searchRepo";

export const getPackageJsonFile = async (payload = {}) => {
  if ((payload && !payload.commits) || (payload && !payload.commits.length)) {
    const paths = await searchRepo(payload);
    return paths.length !== 0 ? paths : false;
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

  return results.length === 0 ? false : results;
};

export const getPackagePath = async (
  baseUrl = "https://raw.githubusercontent.com",
  payload
) => {
  const json = await getPackageJsonFile(payload);

  if (json && payload.after) {
    return json.map(
      file =>
        `${baseUrl}/${payload.repository.full_name}/${payload.after}/${file}`
    );
  }

  if (json && payload.repositories) {
    return json.map(
      file => `${baseUrl}/${payload.repositories[0].full_name}/master/${file}`
    );
  }

  throw new Error(`No package.json file found`);
};
