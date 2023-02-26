import { Zip } from "./zip.ts"
import { Archive } from "./archive.ts"

export * from "./archive.ts"

const archives: Archive[] = [ new Zip() ]

export function detectArchive(filePath: string): Archive | undefined {
  return archives.find(a => a.validate(filePath))
}
