import { searchRepo } from "../../lib/searchRepo";
import { createWebhook } from "../../__mocks__/createWebhook";

const octokit = {};
const mockCallback = jest.fn(() => ({
  data: { total_count: 1, items: [{ path: "package.json" }] }
}));

octokit.authenticate = () => {
  return true;
};
octokit.apps = {};
octokit.apps.createInstallationToken = () => {
  return { data: { token: "foo" } };
};

octokit.search = {};
octokit.search.code = mockCallback;

describe("create issues", () => {
  it("returns the searched paths when passing valid data", async () => {
    const body = await createWebhook;
    let results = await searchRepo(octokit, body);
    expect(results[0]).toEqual("package.json");
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it("returns false when no data is passed", async () => {
    const results = await searchRepo(octokit, "");
    expect(results).toEqual(false);
  });
});
