
export interface Archive {
  validate(filePath: string): boolean;
  compress(srcFilePaths: string[], destFilePath: string): Promise<void>;
  decompress(srcFilePath: string, destDirPath: string): Promise<void>;
  list(srcFilePath: string): Promise<void>;
}
