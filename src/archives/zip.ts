import { taskEither } from "fp-ts";
import { runCmdRaw, runCmdTaskE } from "../common/cmd.ts";
import { AError } from "../error.ts";
import { Archive } from "./archive.ts";

export class Zip implements Archive {
  validate(filePath: string): boolean {
    return filePath.endsWith(".zip");
  }
  compressTask(srcFilePaths: string[], destFilePath: string): taskEither.TaskEither<AError, void> {
    const srcPathsForCmd = srcFilePaths.map((s) => '"' + s + '"').join(" ");
    return runCmdTaskE(`zip -r "${destFilePath}" ${srcPathsForCmd}`);
  }
  decompressTask(srcFilePath: string, destDirPath: string): taskEither.TaskEither<AError, void> {
    return runCmdTaskE(`unzip "${srcFilePath}" -d "${destDirPath}"`);
  }
  listTask(srcFilePath: string): taskEither.TaskEither<AError, void> {
    return runCmdTaskE(`unzip -l "${srcFilePath}"`);
  }
}
