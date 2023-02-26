import $ from "dax";

import { either } from "fp-ts";
import { detectArchive } from "./archives/mod.ts";
import { stat } from "./common/file.ts";

export async function compress(srcPaths: string[], destPath: string) {
  if (either.isRight(await stat(destPath))) {
    $.logError(`cannot create ${destPath}: File exists`);
  } else {
    const archive = detectArchive(destPath);
    if (archive == undefined) {
      $.logError(`cannot create ${destPath}: Not supported`);
    } else {
      await archive.compress(srcPaths, destPath);
    }
  }
}
