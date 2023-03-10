import { Zip } from "./zip.ts"
import { Archive } from "./archive.ts"
import { option, either, function as f } from "fp-ts"
import { AError } from "../error.ts"
import { Tar } from "./tar.ts"

export * from "./archive.ts"

const archives: Archive[] = [ new Zip() , new Tar([".tar.gz"]), new Tar([".tar.bz2"])]

export function detectArchive(filePath: string): either.Either<AError, Archive> {
    return f.pipe(
      option.fromNullable(archives.find(a => a.validate(filePath))),
      either.fromOption(() => new AError("not support format"))
    )
}


