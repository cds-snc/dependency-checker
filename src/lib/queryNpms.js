import {default as fetch} from "node-fetch";

export const queryNpms = async name => {
  const path = `https://api.npms.io/v2/package/${encodeURIComponent(name)}`;
  let response = await fetch(path);
  const result = await response.json();
  return result;
};
