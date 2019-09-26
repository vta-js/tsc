/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");

const file = path.resolve(__dirname, "../yarn.lock");
if (fse.existsSync(file)) {
  console.log(chalk.cyan("\nformat yarn.lock\n"));
  fse
    .readFile(file, "utf8")
    .then(blob => blob.toString())
    .then(content => content.replace(/\?cache=.+?#/gim, "#"))
    .then(content => {
      fse.writeFile(file, content, { encoding: "utf8" });
    });
}
