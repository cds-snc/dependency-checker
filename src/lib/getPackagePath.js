export const getPackageJsonFile = (payload = {}) => {
  if ((payload && !payload.commits) || (payload && !payload.commits.length)) {
    return "package.json";
  }

  let result = "package.json";

  payload.commits[payload.commits.length - 1].modified.filter(item => {
    if (item.indexOf("package.json") !== -1) {
      result = item;
    }
  });

  return result;
};

export const getPackagePath = (
  baseUrl = "https://raw.githubusercontent.com",
  payload
) => {
  const json = getPackageJsonFile();

  return `${baseUrl}/${payload.repository.full_name}/${payload.after}/${json}`;
};
