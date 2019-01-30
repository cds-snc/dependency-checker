import { searchRepo } from "../../lib/searchRepo";
import { createWebhook } from "../../__mocks__/createWebhook";
import { authenticate } from "../../lib/githubAuth";

jest.mock("../../lib/githubAuth", () => {
  return {
    authenticate: jest.fn(() => {
      const octokit = {};
      const mockCallback = jest.fn(() => ({
        data: { total_count: 1, items: [{ path: "package.json" }] }
      }));

      octokit.apps = {};
      octokit.apps.createInstallationToken = () => {
        return { data: { token: "foo" } };
      };

      octokit.search = {};
      octokit.search.code = mockCallback;
      return octokit;
    })
  };
});

describe("create issues", () => {
  it("returns the searched paths when passing valid data", async () => {
    const body = await createWebhook;
    let results = await searchRepo(body);
    expect(results[0]).toEqual("package.json");
    expect(authenticate).toHaveBeenCalledTimes(1);
  });

  it("returns false when no data is passed", async () => {
    const results = await searchRepo("");
    expect(results).toEqual(false);
  });
});
