const getPackageJsonFile = () => {
  return "package.json";
};

export const getPackagePath = (
  baseUrl = "https://raw.githubusercontent.com",
  payload
) => {
  const json = getPackageJsonFile();

  return `${baseUrl}/${payload.repository.full_name}/${payload.after}/${json}`;
};
