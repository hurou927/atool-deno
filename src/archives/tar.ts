import { taskEither } from "fp-ts";
import { runCmdTask } from "../common/cmd.ts";
import { AError } from "../error.ts";
import { Archive } from "./archive.ts";

export class Tar implements Archive {
  private suffixs: string[];
  constructor(suffixs: string[]) {
    this.suffixs = suffixs;
  }

  validate(filePath: string): boolean {
    return this.suffixs.find(suffix => filePath.endsWith(suffix)) != null
  }
  compressTask(srcFilePaths: string[], destFilePath: string): taskEither.TaskEither<AError, void> {
    const srcPathsForCmd = srcFilePaths.map((s) => '"' + s + '"').join(" ");
    return runCmdTask(`tar cvf "${destFilePath}" ${srcPathsForCmd}`);
  }
  decompressTask(srcFilePath: string, destDirPath: string): taskEither.TaskEither<AError, void> {
    return runCmdTask(`tar xvf "${srcFilePath}" -C "${destDirPath}"`);
  }
  listTask(srcFilePath: string): taskEither.TaskEither<AError, void> {
    return runCmdTask(`tar tvf "${srcFilePath}"`);
  }
}
