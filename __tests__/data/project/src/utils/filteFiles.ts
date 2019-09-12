import path from "path";
import glob from "glob";

export default function filteFiles(
  pattern = "**/*.*",
  cwd: string = process.cwd(),
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(
      pattern,
      {
        cwd,
        realpath: true,
      },
      (err, matches) => {
        if (err) {
          reject(err);
        } else {
          resolve(matches.map(file => path.relative(cwd, file)));
        }
      },
    );
  });
}
