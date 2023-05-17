import { mkdir, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, posix, relative, sep } from "node:path";
import { Type } from "@sinclair/typebox";
import { isNodeJsError } from "#utils";

import type { Dirent } from "node:fs";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(rootDir, "..", "..", "..", "..", "public");

async function mkdirIfNotExists(path: string): Promise<void> {
  try {
    await mkdir(path, { recursive: true });
  } catch (e) {
    if (!e || !isNodeJsError(e, Error) || e.code !== "EEXIST") {
      throw e;
    }
  }
}

async function printSchema(baseDir: string, dirent: Dirent): Promise<void> {
  const filePath = join(baseDir, dirent.name);
  const relativePath = relative(rootDir, filePath).split(sep).join(posix.sep);
  const {
    default: { schema }
  } = await import("file://" + filePath);
  const outputPath = join(
    publicDir,
    relativePath.replace(".schema.js", ".schema.json")
  );
  await mkdirIfNotExists(dirname(outputPath));
  const jsonSchema = Type.Strict(schema);
  await writeFile(outputPath, JSON.stringify(jsonSchema, null, 2), {
    encoding: "utf-8"
  });
}

async function processDirectory(baseDir: string): Promise<void> {
  const dirents = await readdir(baseDir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isFile()) {
      if (!dirent.name.endsWith(".schema.js")) {
        continue;
      }
      await printSchema(baseDir, dirent);
    } else if (dirent.isDirectory()) {
      const currDir = join(baseDir, dirent.name);
      await processDirectory(currDir);
    }
  }
}

async function main(): Promise<void> {
  await processDirectory(rootDir);
}

main();
