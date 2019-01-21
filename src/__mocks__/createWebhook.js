import path from "path";
import { getFile } from "../lib/getFile";

export const toJS = async () => {
  const file = path.resolve(__dirname, `create-payload.json`);
  const result = await getFile(file);
  try {
    return JSON.parse(result);
  } catch (e) {
    console.log("failed to parse payload", e.message);
    return {};
  }
};

export const webhook = toJS();
