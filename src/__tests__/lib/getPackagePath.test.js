import { pushWebhook } from "../../__mocks__/pushWebhook";
import { createWebhook } from "../../__mocks__/createWebhook";
import { getPackagePath, getPackageJsonFile } from "../../lib/getPackagePath";
import { searchRepo } from "../../lib/searchRepo";

jest.mock("../../lib/searchRepo", () => ({
  searchRepo: jest.fn(async (octokit, body) => {
    return ["package.json"];
  })
}));

test("return a valid path", async () => {
  const payload = await pushWebhook;
  const after = "1d82437635ad8d05e039b70bb17f60cb10774424";
  const basePath = "https://raw.githubusercontent.com";
  const expectPath = `${basePath}/cds-snc/bundle-size-tracker-demo-app/${after}/package.json`;
  const path = await getPackagePath(undefined, payload);
  expect(expectPath).toEqual(path);
});

test("can parse package.json from PR payload", async () => {
  const payload = await pushWebhook;
  const result = await getPackageJsonFile(payload);
  expect(result).toEqual("package.json");
});

test("can parse package.json create payload", async () => {
  const payload = await createWebhook;
  const result = await getPackageJsonFile(payload);
  expect(searchRepo).toHaveBeenCalledTimes(1);
  expect(result).toEqual("package.json");
});

test("throws an error if cannot find any package.json", async () => {
  try {
    await getPackageJsonFile({});
  } catch (e) {
    expect(e);
  }
});
