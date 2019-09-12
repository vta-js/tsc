import tmp from "tmp";

export default function mkDir(): Promise<string> {
  return new Promise((resolve, reject) => {
    tmp.dir({ prefix: "vta-", unsafeCleanup: true }, (err, name) => {
      if (err) {
        reject(err);
      } else {
        resolve(name);
      }
    });
  });
}
