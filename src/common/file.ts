
import { either } from "fp-ts";

export async function stat(
  filePath: string
): Promise<either.Either<"NotFound", Deno.FileInfo>> {
  try {
    const fileInfo: Deno.FileInfo = await Deno.stat(filePath);
    return either.right(fileInfo);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return either.left("NotFound");
    } else {
      throw err;
    }
  }
}
