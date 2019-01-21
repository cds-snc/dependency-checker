import {
  getPackageJson,
  getDeps,
  getRepoDependencies,
  getRemotePackageJson
} from "../lib/getDeps";
import { getPackagePath } from "../lib/getPackagePath";
import { webhook } from "../__mocks__/webhook";
import path from "path";

const filePath = (filename = "package-json.json") => {
  return path.resolve(__dirname, `../__mocks__/${filename}`);
};

test("returns false if file path passed", async () => {
  const result = await getPackageJson();
  expect(result).toEqual(false);
});

test("returns json and has name prop", async () => {
  const result = await getPackageJson(filePath());
  let checkResult = false;

  if (result && result.name && result.name === "mock-package.json") {
    checkResult = true;
  }

  expect(checkResult).toEqual(true);
});

test("can get local dependencies", async () => {
  const result = await getDeps(filePath(), true);

  let checkResult = false;

  if (
    result &&
    (result.esm && result.esm === "^3.0.84") &&
    (result["@babel/core"] && result["@babel/core"] === "^7.2.2")
  ) {
    checkResult = true;
  }

  expect(checkResult).toEqual(true);
});

test("can get remote package.json dependencies", async () => {
  const payload = await webhook;
  const path = await getPackagePath(undefined, payload);
  const result = await getDeps(path);

  let checkResult = false;

  if (result && result.react) {
    checkResult = true;
  }

  expect(checkResult).toEqual(true);
});

test("can get repo package.json dependencies", async () => {
  const payload = await webhook;
  const result = await getRepoDependencies(payload);

  let checkResult = false;

  if (result && result.react) {
    checkResult = true;
  }

  expect(checkResult).toEqual(true);
});

test("handles bad fetch", async () => {
  try {
    await getRemotePackageJson("http://example.com");
  } catch (e) {
    expect(e.message).toBe(
      "invalid json response body at http://example.com/ reason: Unexpected token < in JSON at position 0"
    );
  }
});
