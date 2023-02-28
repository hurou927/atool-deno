import { taskEither } from "fp-ts";
import { runCmdTask } from "../common/cmd.ts";
import { AError } from "../error.ts";
import { Archive } from "./archive.ts";

export class Zip implements Archive {
  validate(filePath: string): boolean {
    return filePath.endsWith(".zip");
  }
  compressTask(srcFilePaths: string[], destFilePath: string): taskEither.TaskEither<AError, void> {
    const srcPathsForCmd = srcFilePaths.map((s) => '"' + s + '"').join(" ");
    return runCmdTask(`zip -r "${destFilePath}" ${srcPathsForCmd}`);
  }
  decompressTask(srcFilePath: string, destDirPath: string): taskEither.TaskEither<AError, void> {
    return runCmdTask(`unzip "${srcFilePath}" -d "${destDirPath}"`);
  }
  listTask(srcFilePath: string): taskEither.TaskEither<AError, void> {
    return runCmdTask(`unzip -l "${srcFilePath}"`);
  }
}
