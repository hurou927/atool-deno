import $ from "dax";

import { function as f, either, option, taskEither, task } from "fp-ts";
import { Archive } from "./archives/archive.ts";
import { detectArchive } from "./archives/mod.ts";
import { stat } from "./common/file.ts";
import { AError } from "./error.ts";

function checkFileTask(destPath: string): taskEither.TaskEither<AError, void> {
  return () =>
    stat(destPath).then((opt) => {
      if (option.isNone(opt)) {
        return either.right(undefined);
      } else {
        return either.left(
          new AError(`cannot create ${destPath}: File exsits`)
        );
      }
    });
}


export async function compress(srcPaths: string[], destPath: string) {
  const task: taskEither.TaskEither<AError, void> = f.pipe(
    checkFileTask(destPath),
    taskEither.chain<AError, void, Archive>(() => taskEither.fromEither(detectArchive(destPath))),
    taskEither.chain((archive: Archive) => archive.compressTask(srcPaths, destPath)),
  );
  const result = await task();
  either.match(
    (err: AError) => $.logError(err.message),
    (_ok) => $.logStep("success")
  )(result)
}
