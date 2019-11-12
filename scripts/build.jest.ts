import path from "path";
import fse from "fs-extra";
import tsc from "../src";

jest.setTimeout(100000);

it("build dist files", () => {
  return tsc({
    project: "tsconfig-build.json",
  })
    .then(() => {
      return fse.pathExists(path.resolve(__dirname, "../dist/index.js")).then(exists => {
        expect(exists).toBe(true);
      });
    })
    .then(() => {
      return fse.pathExists(path.resolve(__dirname, "../dist/index.d.ts")).then(exists => {
        expect(exists).toBe(true);
      });
    });
});
