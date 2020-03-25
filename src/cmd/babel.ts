import path from "path";
import chalk from "chalk";
import spawn from "../utils/spawn";

export interface BabelOptions {
  sourceDir: string;
  outDir: string;
  project: string;
  extensions: string[];
  cwd: string;
}
export default async function babel(
  options: BabelOptions,
  log: (msg: string) => void,
): Promise<void> {
  log(`babel: build files to ${chalk.cyan(path.relative(options.cwd, options.outDir))}`);
  await spawn("babel", [
    options.sourceDir,
    "--config-file",
    options.project,
    "--out-dir",
    options.outDir,
    "--extensions",
    options.extensions
      .map((ext) => ext.replace(/^\.+/, ""))
      .map((ext) => `.${ext}`)
      .join(","),
    "--copy-files",
  ]);
}
