import { taskEither } from "fp-ts";
import { AError } from "../error.ts";


export interface Archive {
  validate(filePath: string): boolean;
  compressTask(srcFilePaths: string[], destFilePath: string): taskEither.TaskEither<AError, void>;
  decompressTask(srcFilePath: string, destDirPath: string): taskEither.TaskEither<AError, void>;
  listTask(srcFilePath: string): taskEither.TaskEither<AError, void>;
}
