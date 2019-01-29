import { pushWebhook } from "../../__mocks__/pushWebhook";
import { createWebhook } from "../../__mocks__/createWebhook";
import { getPackagePath, getPackageJsonFile } from "../../lib/getPackagePath";
import { searchRepo } from "../../lib/searchRepo";

jest.mock("../../lib/searchRepo", () => ({
  searchRepo: jest.fn(async (octokit, body) => {
    return ["package.json", "subapp/package.json"];
  })
}));

test("return a valid path", async () => {
  const payload = await pushWebhook;
  const after = "8c33ca3dad9cdfd05d684d762f6a471ede932790";
  const basePath = "https://raw.githubusercontent.com";
  const expectPath = [
    `${basePath}/cds-snc/bundle-size-tracker-demo-app/${after}/subapp/package.json`,
    `${basePath}/cds-snc/bundle-size-tracker-demo-app/${after}/package.json`
  ];
  const path = await getPackagePath(undefined, payload);
  expect(expectPath).toEqual(path);
});

test("can parse package.json from PR payload", async () => {
  const payload = await pushWebhook;
  const result = await getPackageJsonFile(payload);
  expect(result).toEqual(["subapp/package.json", "package.json"]);
});

test("can parse package.json create payload", async () => {
  const payload = await createWebhook;
  const result = await getPackageJsonFile(payload);
  expect(searchRepo).toHaveBeenCalledTimes(1);
  expect(result).toEqual(["package.json", "subapp/package.json"]);
});

test("throws an error if cannot find any package.json", async () => {
  try {
    await getPackageJsonFile({});
  } catch (e) {
    expect(e);
  }
});
