import { either, option, taskEither } from "fp-ts";
import { AError } from "../error.ts";

export async function stat(
  filePath: string
): Promise<option.Option<Deno.FileInfo>> {
  try {
    const fileInfo: Deno.FileInfo = await Deno.stat(filePath);
    return option.some(fileInfo);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return option.none;
    } else {
      throw err;
    }
  }
}

export function statTask(
  filePath: string
): taskEither.TaskEither<AError, Deno.FileInfo> {
  return taskEither.tryCatch(
    () => Deno.stat(filePath),
    (err) => {
      if (err instanceof Deno.errors.NotFound) {
        return new AError("FileNotFound");
      } else {
        return new AError("UnknownDenoStatError");
      }
    }
  );
}
