import path from "path";
import fse from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import mkTmpDir from "./utils/mkTmpDir";
import cmdTsc from "./cmd/tsc";
import cmdBabel from "./cmd/babel";

export interface TscOption {
  sourceDir?: string;
  outDir?: string;
  project?: string;
  babel?: string | false;
  esnext?: boolean;
  extTs?: string;
  extJs?: string;
  silent?: boolean;
  cwd?: string;
}

export default async function tsc(options: TscOption): Promise<Error> {
  const spinner = options.silent ? undefined : ora({ discardStdin: false }).start();
  const log = (msg: string): void => {
    if (spinner) {
      spinner.text = `[@vta/tsc] ${msg}`;
    }
  };
  try {
    const cwd = options.cwd || process.cwd();
    const sourceDir = path.resolve(cwd, options.sourceDir || "src");
    const outDir = path.resolve(cwd, options.outDir || "dist");
    await fse.emptyDir(outDir);
    let tsOutDir;
    if (options.babel !== false) {
      log("create temporary dir");
      tsOutDir = await mkTmpDir();
    } else {
      tsOutDir = outDir;
    }
    // tsc
    await cmdTsc(
      {
        sourceDir,
        outDir: tsOutDir,
        project: path.resolve(cwd, options.project || "tsconfig.json"),
        extensions: (options.extTs || "ts").split(","),
        withBabel: options.babel !== false,
        esnext: options.esnext !== false,
        cwd,
      },
      log,
    );
    // babel
    if (options.babel !== false) {
      await cmdBabel(
        {
          sourceDir: tsOutDir,
          outDir,
          project: path.resolve(cwd, options.babel || "babel.config.js"),
          extensions: (options.extJs || "js").split(","),
          cwd,
        },
        log,
      );
      await fse.remove(tsOutDir);
    }
    if (spinner) {
      spinner.succeed(
        chalk.green(
          `[@vta/tsc] successfully build files from ${chalk.cyan(
            path.relative(cwd, sourceDir),
          )} to ${chalk.cyan(path.relative(cwd, outDir))}`,
        ),
      );
    }
  } catch (err) {
    if (spinner) {
      spinner.fail(`[@vta/tsc] ${chalk.red(err.message)}`);
    } else {
      console.error(`[@vta/tsc] ${chalk.red(err.message)}`);
    }
    return new Error(err.message);
  }
  return undefined;
}
