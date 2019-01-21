import { webhook } from "../__mocks__/webhook";
import { getPackagePath } from "../lib/getPackagePath";

test("return a valid path", async () => {
  const payload = await webhook;
  const after = "1d82437635ad8d05e039b70bb17f60cb10774424";
  const basePath = "https://raw.githubusercontent.com";
  const expectPath = `${basePath}/cds-snc/bundle-size-tracker-demo-app/${after}/package.json`;
  const path = getPackagePath(undefined, payload);
  expect(expectPath).toEqual(path);
});
