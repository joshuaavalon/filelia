import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { loadJsonYaml } from "#utils";

import type { Dirent } from "node:fs";
import type { FastifyBaseLogger } from "fastify";

export interface FileIndexResult<T = unknown> {
  data: T;
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
        if (!/\.filelia\.(?:json|ya?ml)$/iu.test(dirent.name)) {
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
    try {
      const data = await loadJsonYaml(path);
      return { path, data };
    } catch (err) {
      this.#logger.error({ err, path }, "Failed to parse file");
      return { path, data: null };
    }
  }
}
