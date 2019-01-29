import { default as defaultFetch } from "node-fetch"; // eslint-disable-line import/no-named-default

export const queryNpms = async (name, fetch = defaultFetch) => {
  const path = `https://api.npms.io/v2/package/${encodeURIComponent(name)}`;
  let response = await fetch(path);
  const result = await response.json();
  return result;
};
