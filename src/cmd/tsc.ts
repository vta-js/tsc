import path from "path";
import chalk from "chalk";
import spawn from "../utils/spawn";
import copyFiles from "../utils/copyFiles";

export interface TscOptions {
  sourceDir: string;
  outDir: string;
  project: string;
  extensions: string[];
  exclude: string[];
  withBabel: boolean;
  esnext: boolean;
  cwd: string;
}
export default async function tsc(options: TscOptions, log: (msg: string) => void): Promise<void> {
  const sourceDir = path.relative(options.cwd, options.sourceDir);
  const outDir = options.withBabel ? options.outDir : path.relative(options.cwd, options.outDir);
  log(`tsc: build files from ${chalk.cyan(sourceDir)} to ${chalk.cyan(outDir)}`);
  await spawn(
    "tsc",
    [
      "-p",
      options.project,
      "--outDir",
      options.outDir,
      "--rootDir",
      options.sourceDir,
      "--newLine",
      "LF",
    ].concat(
      options.withBabel && options.esnext ? ["--module", "esnext", "--target", "esnext"] : [],
    ),
    {
      stdio: ["ignore", "ignore", "inherit"],
    },
  );
  log(`tsc: copy files from ${chalk.cyan(sourceDir)} to ${chalk.cyan(outDir)}`);
  await copyFiles(
    options.sourceDir,
    options.outDir,
    "**/*.*",
    (options.exclude || []).concat(
      options.extensions.length === 1
        ? [`**/*.${options.extensions[0].replace(/^\.+/, "")}`]
        : [`**/*.{${options.extensions.map(ext => ext.replace(/^\.+/, "")).join(",")}}`],
    ),
    options.sourceDir,
  );
}
