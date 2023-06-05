import { readdir } from "node:fs/promises";
import { join } from "node:path";

import type { Dirent } from "node:fs";
import type { FastifyBaseLogger, FastifyInstance } from "fastify";

export interface FileIndexResult<T = unknown> {
  data: T;
  path: string;
}

export interface FileIndexerOptions {
  logger: FastifyBaseLogger;
  fastify: FastifyInstance;
}

export default class FileIndexer {
  #logger: FastifyBaseLogger;
  #fastify: FastifyInstance;

  public constructor(opts: FileIndexerOptions) {
    const { logger, fastify } = opts;
    this.#logger = logger;
    this.#fastify = fastify;
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
      const data = await this.#fastify.loadJsonYaml(path);
      return { path, data };
    } catch (err) {
      this.#logger.error({ err, path }, "Failed to parse file");
      return { path, data: null };
    }
  }
}
