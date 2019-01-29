import { loadPackages, savePackage } from "../../lib/firestore";

describe("loadPackages", () => {
  it("returns an array of packages", async () => {
    let result = await loadPackages("cds-snc/bundle-size-tracker-demo-app");
    expect(result).toEqual(["rando-names"]);
  });
});

describe("savePackage", () => {
  it("saves a package to Firestore", async () => {
    let payload = {
      name: "rando-names"
    };
    let results = await savePackage(
      "cds-snc/bundle-size-tracker-demo-app",
      payload
    );
    expect(results).toEqual(true);
  });
});
