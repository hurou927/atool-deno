import $ from 'dax';

import { Command } from "cliffy";

import { compress } from "./src/compress.ts"

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

  await new Command()
    .name("atool")
    .version("0.0.1")
    .description("atool with Deno")
    .command("c", compressCommand)
    .parse(Deno.args);
}
