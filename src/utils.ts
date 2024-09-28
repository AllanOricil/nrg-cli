import path from "path";
import { packageDirectorySync } from "pkg-dir";
import globalModules from "global-modules";

function getPlopfileFilepath() {
  const packageDirectory = packageDirectorySync();
  return path.resolve(
    packageDirectory
      ? path.join(packageDirectory, "node_modules")
      : globalModules,
    "@allanoricil/nrg-generator/plopfile.js",
  );
}

export { getPlopfileFilepath };
