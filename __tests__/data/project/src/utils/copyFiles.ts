import path from "path";
import fse from "fs-extra";
import filteFiles from "./filteFiles";

function copyFilesOneByOne(from: string, dest: string, files: string[]): Promise<void> {
  if (files.length > 0) {
    const [file] = files;
    const destFile = path.resolve(dest, file);
    return fse
      .ensureDir(path.dirname(destFile))
      .then(() => fse.copyFile(path.resolve(from, file), destFile))
      .then(() => copyFilesOneByOne(from, dest, files.slice(1)));
  }

  return Promise.resolve();
}

export default async function copyFiles(
  from: string,
  dest: string,
  pattern: string,
  cwd: string,
): Promise<void> {
  const files = await filteFiles(pattern, cwd);
  await copyFilesOneByOne(from, dest, files);
}
