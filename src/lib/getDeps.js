import { getFile, fetchPackageData } from "./getFile";
import { getPackagePath } from "./getPackagePath";

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

export const getRemotePackageJson = async path => {
  const result = await fetchPackageData(path);
  return result;
};

export const getDeps = async (path, local = false) => {
  let obj = {};

  if (local) {
    obj = await getPackageJson(path);
  } else {
    obj = await getRemotePackageJson(path);
  }

  if (!obj || !obj.dependencies || !obj.devDependencies) {
    return false;
  }
  return { ...obj.dependencies, ...obj.devDependencies };
};

export const getRepoDependencies = async payload => {
  const path = await getPackagePath(undefined, payload);
  const result = await getDeps(path);
  return result;
};
