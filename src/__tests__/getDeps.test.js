import {
  getPackageJson,
  getDeps,
  getRepoDependencies,
  getRemotePackageJson
} from "../lib/getDeps";
import { getPackagePath } from "../lib/getPackagePath";
import { webhook } from "../__mocks__/webhook";
import path from "path";

const mockObj = {
  name: "the-app",
  version: "2.0.0",
  license: "MIT",
  dependencies: {
    react: "^16.7.0",
    "react-dom": "^16.7.0",
    "react-scripts": "2.1.3"
  },
  scripts: {
    start: "npm run build_it && node index.js"
  },
  devDependencies: {}
};

jest.mock("../lib/fetchPackageData", () => {
  const actualFetch = require.requireActual("../lib/fetchPackageData");
  return {
    ...actualFetch,
    fetchPackageData: jest.fn(async url => {
      if (url === "http://example.com") {
        throw new Error("bad request");
      }
      return mockObj;
    })
  };
});

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
    expect(e.message).toBe("bad request");
  }
});
