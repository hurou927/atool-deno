
import $ from "dax";

export async function runCmdRaw(cmd: string) {
  $.logStep(`RUN: ${cmd}`);
  await $.raw`${cmd}`
}
