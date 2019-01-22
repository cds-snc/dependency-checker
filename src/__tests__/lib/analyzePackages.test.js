import { getSuspicious } from "../../lib/analyzePackages";
import { queryNpms } from "../../lib/queryNpms";

jest.mock("../../lib/queryNpms", () => ({
  queryNpms: jest.fn(async name => {
    switch (name) {
      case "good":
        return {
          score: {
            final: 1
          }
        };
      case "bad":
        return {
          score: {
            final: 0
          }
        };
      default:
        return {
          code: "NOT_FOUND"
        };
    }
  })
}));

describe("runs packages through tests and returns supicious packages", () => {
  it("returns suspicious packages if they have a score less than the cut off", async () => {
    const result = await getSuspicious({ bad: "version" });
    expect(queryNpms).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ name: "bad", score: { final: 0 } }]);
  });

  it("returns suspicious packages if they have no entry", async () => {
    const result = await getSuspicious({ foo: "version" });
    expect(queryNpms).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ code: "NOT_FOUND", name: "foo" }]);
  });

  it("does not return packages if they have a score above the cut off", async () => {
    const result = await getSuspicious({ good: "version" });
    expect(queryNpms).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
