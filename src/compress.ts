import $ from "dax";

import { function as f, either, option, taskEither } from "fp-ts";
import { Archive } from "./archives/archive.ts";
import { detectArchive } from "./archives/mod.ts";
import { fileNotExistTask, isDirectoryTask, statTask } from "./common/file.ts";
import { AError } from "./error.ts";


export async function compress(srcPaths: string[], destPath: string) {
  const task: taskEither.TaskEither<AError, void> = f.pipe(
    fileNotExistTask(destPath),
    taskEither.chain<AError, void, Archive>(() =>
      taskEither.fromEither(detectArchive(destPath))
    ),
    taskEither.chain((archive: Archive) =>
      archive.compressTask(srcPaths, destPath)
    )
  );
  const result = await task();
  either.match(
    (err: AError) => $.logError(err.message),
    (_ok) => {}
  )(result);
}

export async function list(srcPath: string) {

  const task: taskEither.TaskEither<AError, void> = f.pipe(
    statTask(srcPath),
    taskEither.chain<AError, Deno.FileInfo, Archive>((_a) =>
      taskEither.fromEither(detectArchive(srcPath))
    ),
    taskEither.chain((archive: Archive) => archive.listTask(srcPath))
  );
  const result = await task();
  either.match(
    (err: AError) => $.logError(err.message),
    (_ok) => {}
  )(result);
}

export async function decompress(srcPath: string, destDirPath: string) {
  const task: taskEither.TaskEither<AError, void> = f.pipe(
    statTask(srcPath),
    taskEither.chain(() => isDirectoryTask(destDirPath)),
    taskEither.chain<AError, void, Archive>(() =>
      taskEither.fromEither(detectArchive(srcPath))
    ),
    taskEither.chain((archive: Archive) => archive.decompressTask(srcPath, destDirPath))
  );
  const result = await task();
  either.match(
    (err: AError) => $.logError(err.message),
    (_ok) => {}
  )(result);
}
