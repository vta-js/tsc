import path from "path";
import fse from "fs-extra";
import tsc from "../src";
import filteFiles from "../src/utils/filteFiles";

jest.setTimeout(100000);

describe("utils", () => {
  it("filteFiles", () => {
    return filteFiles("**/*.!(ts|tsx)", [], path.resolve(__dirname, "./data/project/src")).then(
      (files) => {
        expect(files.length).toBe(3);
      },
    );
  });
});

function testDistFile(file: string, expectedExists = true): Promise<void> {
  return fse.pathExists(file).then((exists) => {
    expect(exists).toBe(expectedExists);
    if (expectedExists) {
      return fse.readFile(file).then((content) => {
        expect(content.toString("utf-8")).toMatchSnapshot();
      });
    }
    return undefined;
  });
}

/* eslint-disable jest/expect-expect */
describe("tsc", () => {
  it("node-12.6.0", () =>
    tsc({
      project: "tsconfig-build.json",
      outDir: "../../__snapshots__/dist/node-12.6.0",
      extTs: ".ts,.tsx",
      extJs: ".js,.jsx",
      cwd: path.resolve(__dirname, "./data/project"),
    })
      .then(() =>
        testDistFile(path.resolve(__dirname, "__snapshots__/dist/node-12.6.0/utils/copyFiles.js")),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0/utils/copyFiles.d.ts"),
        ),
      ));

  it("node-12.6.0-no-dts", () =>
    tsc({
      project: "tsconfig-build-nodts.json",
      outDir: "../../__snapshots__/dist/node-12.6.0-no-dts",
      extTs: ".ts,.tsx",
      extJs: ".js,.jsx",
      cwd: path.resolve(__dirname, "./data/project"),
    })
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-dts/utils/copyFiles.js"),
        ),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-dts/utils/copyFiles.d.ts"),
          false,
        ),
      ));

  it("node-12.6.0-no-babel", () =>
    tsc({
      project: "tsconfig-build.json",
      babel: false,
      outDir: "../../__snapshots__/dist/node-12.6.0-no-babel",
      extTs: ".ts,.tsx",
      extJs: ".js,.jsx",
      cwd: path.resolve(__dirname, "./data/project"),
    })
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-babel/utils/copyFiles.js"),
        ),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-babel/utils/copyFiles.d.ts"),
        ),
      ));

  it("node-12.6.0-no-jsx", () =>
    tsc({
      project: "tsconfig-build-nodts.json",
      outDir: "../../__snapshots__/dist/node-12.6.0-no-jsx",
      extTs: ".ts,.tsx",
      extJs: ".js",
      cwd: path.resolve(__dirname, "./data/project"),
    })
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-jsx/utils/button.jsx"),
        ),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-jsx/utils/button.js"),
          false,
        ),
      ));

  it("node-12.6.0-exclude-jsx", () =>
    tsc({
      project: "tsconfig-build-nodts.json",
      outDir: "../../__snapshots__/dist/node-12.6.0-exclude-jsx",
      extTs: ".ts,.tsx",
      extJs: ".js",
      exclude: ["**/*.jsx"],
      cwd: path.resolve(__dirname, "./data/project"),
    })
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-exclude-jsx/utils/button.jsx"),
          false,
        ),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-exclude-jsx/utils/button.js"),
          false,
        ),
      ));

  it("node-12.6.0-no-tsx", () =>
    tsc({
      project: "tsconfig-build-notsx.json",
      outDir: "../../__snapshots__/dist/node-12.6.0-no-tsx",
      extTs: ".ts",
      extJs: ".js,.jsx",
      cwd: path.resolve(__dirname, "./data/project"),
    })
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-tsx/utils/helper/button.tsx"),
        ),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-tsx/utils/filteFiles.ts"),
          false,
        ),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-12.6.0-no-tsx/utils/helper/button.js"),
          false,
        ),
      ));

  it("node-8.16.0", () =>
    tsc({
      project: "tsconfig-build.json",
      babel: "babel.config-8.16.0.js",
      outDir: "../../__snapshots__/dist/node-8.16.0",
      extTs: ".ts,.tsx",
      extJs: ".js,.jsx",
      cwd: path.resolve(__dirname, "./data/project"),
    }).then(() =>
      testDistFile(path.resolve(__dirname, "__snapshots__/dist/node-8.16.0/utils/copyFiles.js")),
    ));

  it("node-8.16.0-no-esnext", () =>
    tsc({
      project: "tsconfig-build.json",
      babel: "babel.config-8.16.0.js",
      outDir: "../../__snapshots__/dist/node-8.16.0-no-esnext",
      extTs: ".ts,.tsx",
      extJs: ".js,.jsx",
      cwd: path.resolve(__dirname, "./data/project"),
      esnext: false,
    })
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-8.16.0-no-esnext/utils/copyFiles.js"),
        ),
      )
      .then(() =>
        testDistFile(
          path.resolve(__dirname, "__snapshots__/dist/node-8.16.0-no-esnext/utils/copyFiles.d.ts"),
        ),
      ));

  it("node-4.0.0", () =>
    tsc({
      project: "tsconfig-build.json",
      babel: "babel.config-4.0.0.js",
      outDir: "../../__snapshots__/dist/node-4.0.0",
      extTs: ".ts,.tsx",
      extJs: ".js,.jsx",
      cwd: path.resolve(__dirname, "./data/project"),
      silent: true,
    }).then(() =>
      testDistFile(path.resolve(__dirname, "__snapshots__/dist/node-4.0.0/utils/copyFiles.js")),
    ));

  it("fail-tsconfig", () =>
    tsc({
      project: "tsconfig-fail.json",
      outDir: "../../__snapshots__/dist/fail-tsconfig",
      cwd: path.resolve(__dirname, "./data/project-fail"),
    }).then((err) => {
      expect(!!err).toBe(true);
      expect(err.message.indexOf("Cannot use JSX unless the '--jsx' flag is provided") >= 0).toBe(
        true,
      );
    }));

  it("fail-babel", () =>
    tsc({
      babel: "babel-fail.config.js",
      outDir: "../../__snapshots__/dist/fail-babel",
      cwd: path.resolve(__dirname, "./data/project-fail"),
    }).then((err) => {
      expect(!!err).toBe(true);
      expect(err.message.indexOf("Cannot find module '@vta/tsc-invalid-babel-plugin'") >= 0).toBe(
        true,
      );
    }));
});
