/* eslint-disable @typescript-eslint/no-var-requires */
const runtimePackageJson = require("@babel/runtime/package.json");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "commonjs",
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          node: "4.0.0",
        },
      },
    ],
    ["@babel/preset-react"],
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", { corejs: false, version: runtimePackageJson.version }],
  ],
};
