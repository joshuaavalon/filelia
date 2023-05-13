import { dirname, isAbsolute, join, relative } from "node:path";
import { createReadStream } from "node:fs";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { Storage } from "../storage.js";
import { isNodeJsError, isReadableDir, isReadableFile, toBuffer } from "#utils";

import type { Readable } from "node:stream";
import type { LocalStorageOptions } from "./options.js";

export * from "./options.js";

export class LocalStorage extends Storage {
  private baseDir: string;

  public constructor(options: LocalStorageOptions) {
    super();
    const { baseDir } = options;
    this.baseDir = baseDir;
    if (!isReadableDir(baseDir)) {
      throw new Error("Path is not a directory or readable.");
    }
  }

  private isChildPath(parent: string, child: string): boolean {
    const relativePath = relative(parent, child);
    return (
      Boolean(relativePath) &&
      !relativePath.startsWith("..") &&
      !isAbsolute(relativePath)
    );
  }

  public async exists(key: string): Promise<boolean> {
    const filePath = join(this.baseDir, key);
    if (!this.isChildPath(this.baseDir, filePath)) {
      return false;
    }
    return await isReadableFile(filePath);
  }

  public async read(key: string): Promise<Readable> {
    const filePath = join(this.baseDir, key);
    if (!this.isChildPath(this.baseDir, filePath)) {
      throw new Error("Invalid Path: " + filePath);
    }
    return createReadStream(filePath);
  }

  public async write(
    key: string,
    source: Readable | ArrayBuffer
  ): Promise<void> {
    const filePath = join(this.baseDir, key);
    if (!this.isChildPath(this.baseDir, filePath)) {
      throw new Error("Invalid Path: " + filePath);
    }
    const parent = dirname(filePath);
    try {
      await mkdir(parent, { recursive: true });
    } catch (e) {
      if (!isNodeJsError(e) || e.code !== "EEXIST") {
        throw e;
      }
    }
    const data =
      source instanceof ArrayBuffer
        ? new Uint8Array(source)
        : await toBuffer(source);
    await writeFile(filePath, data);
  }

  public async remove(key: string): Promise<void> {
    const filePath = join(this.baseDir, key);
    if (!this.isChildPath(this.baseDir, filePath)) {
      throw new Error("Invalid Path: " + filePath);
    }
    await unlink(filePath);
  }
}
