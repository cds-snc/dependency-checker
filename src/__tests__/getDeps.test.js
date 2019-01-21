import { getPackageJson, getDeps } from "../lib/getDeps";
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

test("can get dependencies", async () => {
  const result = await getDeps(filePath());

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
