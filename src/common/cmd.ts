
import $ from "dax";
import { taskEither } from "fp-ts";
import { AError } from "../error.ts";

export async function runCmdRaw(cmd: string) {
  $.logStep(`RUN: ${cmd}`);
  await $.raw`${cmd}`
}

export function runCmdTask(cmd: string): taskEither.TaskEither<AError, void> {
  return taskEither.tryCatch(
   () => runCmdRaw(cmd),
   err => new AError(`Fail to run command: ${cmd}`)
  )
}
