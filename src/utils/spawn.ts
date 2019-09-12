import { SpawnOptions } from "child_process";
import crossSpawn from "cross-spawn";
import chalk from "chalk";

export default async function spawn(
  command: string,
  args?: string[],
  options: SpawnOptions = {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    const p = crossSpawn(command, args, {
      cwd: process.cwd(),
      stdio: ["pipe", "pipe", "pipe"],
      ...options,
    });
    p.on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        console.log(`\n[command]:${chalk.cyan(command)}`);
        reject(new Error(`spawn execute fail: code ${code}`));
      }
    });
    p.on("error", reject);
  });
}
