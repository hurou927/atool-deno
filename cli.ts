import $ from 'dax';

import { Command } from "cliffy";

import { compress, list, decompress } from "./src/compress.ts"

if (import.meta.main) {
  const compressCommand = new Command()
    .arguments("<destPath:string> <...srcPath:string>")
    .description("Compress files")
    .action(async (_options, destPath: string, ...srcPaths: string[]) => {
      try {
        await compress(srcPaths, destPath)
        Deno.exit(0);
      } catch (err) {
        $.logError(`errors occured: ${err}`)
        Deno.exit(1);
      }
    });
  const listCommand = new Command()
    .arguments("<srcPath:string>")
    .description("List files")
    .action(async (_options, srcPath: string) => {
      try {
        await list(srcPath)
        Deno.exit(0);
      } catch (err) {
        $.logError(`errors occured: ${err}`)
        Deno.exit(1);
      }
    });
  const decompressCommand = new Command()
    .arguments("<srcPath:string> [destDirectoryPath:string]")
    .description("Decompress file")
    .action(async (_options, srcPath: string, destDirectoryPath?: string) => {
      try {
        await decompress(srcPath, destDirectoryPath||"./")
        Deno.exit(0);
      } catch (err) {
        $.logError(`errors occured: ${err}`)
        Deno.exit(1);
      }
    });

  await new Command()
    .name("atool")
    .version("0.0.1")
    .description("atool with Deno")
    .command("pack", compressCommand)
    .command("ls", listCommand)
    .command("unpack", decompressCommand)
    .parse(Deno.args);
}
