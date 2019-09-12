#!/usr/bin/env node

import program from "commander";
import packageJson from "../../package.json";
import tsc from "../index";

program
  .version(packageJson.version, "-v,--version")
  .usage("source-dir --out-dir out-dir [-p tsconfig.json] [-b babel.config.js] [options]")
  .option("--out-dir <dir>", "out dir,default dist")
  .option("-p,--project <tsconfig>", "tsconfig.json file,default tsconfig.json")
  .option("-b,--babel <babelconfig>", "babel config file,default babel.config.js")
  .option("--no-babel", "do not compile use babel")
  .option("--no-esnext", "do not compile to esnext")
  .option("--ext-ts <extensions>", "the file extensions that need to be compiled by tsc,default ts")
  .option(
    "--ext-js <extensions>",
    "the file extensions that need to be compiled by babel,default js",
  )
  .option("--silent", "do not display any except error message")
  .parse(process.argv);

tsc({
  sourceDir: program.args[0],
  outDir: program.outDir,
  project: program.project,
  babel: program.babel,
  esnext: program.esnext,
  extTs: program.extTs,
  extJs: program.extJs,
  silent: program.silent,
});
