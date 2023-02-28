import { function as f, option, taskEither } from "fp-ts";
import { AError } from "../error.ts";
import { eitherCond } from "./util.ts";

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
        return new AError(`${filePath} does not exist`);
      } else {
        return new AError("UnknownDenoStatError");
      }
    }
  );
}

export function fileNotExistTask(
  filePath: string
): taskEither.TaskEither<AError, void> {
  return () => stat(filePath).then((opt) => eitherCond(option.isNone(opt), () => {}, () => new AError(`err`)));
}


export function isDirectoryTask(filePath: string): taskEither.TaskEither<AError, void> {
  return f.pipe(
    statTask(filePath),
    taskEither.chain( (fileInfo) => taskEither.fromEither( eitherCond(fileInfo.isDirectory, () => {}, () => new AError(`${filePath} is not directory`) ))),
  )
}
