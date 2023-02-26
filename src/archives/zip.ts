import { runCmdRaw } from "../common/cmd.ts";
import { Archive } from "./archive.ts";

export class Zip implements Archive {
  validate(filePath: string): boolean {
    return filePath.endsWith(".zip");
  }
  async compress(srcFilePaths: string[], destFilePath: string): Promise<void> {
    const srcPathsForCmd = srcFilePaths.map((s) => '"' + s + '"').join(" ");
    await runCmdRaw(`zip -r "${destFilePath}" ${srcPathsForCmd}`);
  }
  async decompress(srcFilePath: string, destDirPath: string): Promise<void> {
    await runCmdRaw(`unzip "${srcFilePath}" -d "${destDirPath}"`);
  }
  async list(srcFilePath: string): Promise<void> {
    await runCmdRaw(`unzip -l "${srcFilePath}"`);
  }
}
