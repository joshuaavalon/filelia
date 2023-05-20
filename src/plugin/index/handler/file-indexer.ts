import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Dirent } from "node:fs";
import type { FastifyBaseLogger } from "fastify";

export interface FileIndexResult {
  data: unknown;
  path: string;
}

export interface FileIndexerOptions {
  logger: FastifyBaseLogger;
}

export default class FileIndexer {
  #logger: FastifyBaseLogger;

  public constructor(opts: FileIndexerOptions) {
    const { logger } = opts;
    this.#logger = logger;
  }

  public async index(path: string): Promise<FileIndexResult[]> {
    const dirents = await readdir(path, { withFileTypes: true });
    let dataList: FileIndexResult[] = [];
    for (const dirent of dirents) {
      if (dirent.isFile()) {
        if (!dirent.name.endsWith(".filelia.json")) {
          continue;
        }
        const result = await this.indexFile(path, dirent);
        if (result.data) {
          dataList.push(result);
        }
      } else if (dirent.isDirectory()) {
        const dirPath = join(path, dirent.name);
        dataList = dataList.concat(await this.index(dirPath));
      }
    }
    return dataList;
  }

  private async indexFile(
    baseDir: string,
    dirent: Dirent
  ): Promise<FileIndexResult> {
    const path = join(baseDir, dirent.name);
    const data = await readFile(path, { encoding: "utf-8" });
    try {
      return {
        path,
        data: JSON.parse(data)
      };
    } catch (err) {
      this.#logger.error({ err, path }, "Failed to parse file");
      return { path, data: null };
    }
  }
}
