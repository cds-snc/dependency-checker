import { getFile } from "./getFile";

export const getPackageJson = async (path = "") => {
  if (!path) return false;
  const file = await getFile(path);
  try {
    return JSON.parse(file);
  } catch (e) {
    console.log("failed to parse package.json");
    return false;
  }
};

export const getDeps = async path => {
  console.log(path);
  const obj = await getPackageJson(path);

  if (!obj || !obj.dependencies || !obj.devDependencies) {
    return false;
  }

  return { ...obj.dependencies, ...obj.devDependencies };
};
