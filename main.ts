import $ from 'dax';

import { Command } from "cliffy";

import { compress, list, decompress } from "./src/compress.ts"

if (import.meta.main) {
  const compressCommand = new Command()
    .arguments("<destPath:string> <...srcPath:string>")
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
    .command("c", compressCommand)
    .command("l", listCommand)
    .command("d", decompressCommand)
    .parse(Deno.args);
}
