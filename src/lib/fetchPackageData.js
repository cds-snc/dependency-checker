import fetch from "node-fetch";
export const fetchPackageData = async path => {
  let response = await fetch(path);
  const result = await response.json();
  return result;
};
