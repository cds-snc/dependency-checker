import { webhook } from "../__mocks__/webhook";
import { webhook as createWebhook } from "../__mocks__/createWebhook";
import { getPackagePath, getPackageJsonFile } from "../lib/getPackagePath";

test("return a valid path", async () => {
  const payload = await webhook;
  const after = "1d82437635ad8d05e039b70bb17f60cb10774424";
  const basePath = "https://raw.githubusercontent.com";
  const expectPath = `${basePath}/cds-snc/bundle-size-tracker-demo-app/${after}/package.json`;
  const path = getPackagePath(undefined, payload);
  expect(expectPath).toEqual(path);
});

test("can parse package.json from PR payload", async () => {
  const payload = await webhook;
  const result = getPackageJsonFile(payload);
  expect(result).toEqual("package.json");
});

test("can parse package.json create payload", async () => {
  const payload = await createWebhook;
  const result = getPackageJsonFile(payload);
  expect(result).toEqual("package.json");
});
