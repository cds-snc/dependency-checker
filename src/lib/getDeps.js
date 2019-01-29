import { getFile } from "./getFile";
import { fetchPackageData } from "./fetchPackageData";
import { getPackagePath } from "./getPackagePath";
import { asyncForEach } from "./index";

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
    const objStr = JSON.stringify(obj);
    console.log(`no packages found ${objStr}`);
  }
  return { ...obj.dependencies, ...obj.devDependencies };
};

export const getRepoDependencies = async payload => {
  const paths = await getPackagePath(undefined, payload);
  let result = {};

  await asyncForEach(paths, async path => {
    const deps = await getDeps(path);
    result = { ...result, ...deps };
  });

  return result;
};
