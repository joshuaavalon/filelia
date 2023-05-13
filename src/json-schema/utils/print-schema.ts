import { mkdir, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, posix, relative, sep } from "node:path";
import { Type } from "@sinclair/typebox";

import type { Dirent } from "node:fs";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(rootDir, "..", "..", "public");

function isNodeError<T extends new (...args: any) => Error>(
  value: unknown,
  errorType: T
): value is InstanceType<T> & NodeJS.ErrnoException {
  console.log(value instanceof errorType);
  return value instanceof errorType;
}

async function mkdirIfNotExists(path: string): Promise<void> {
  try {
    await mkdir(path, { recursive: true });
  } catch (e) {
    if (!e || !isNodeError(e, Error) || e.code !== "EEXIST") {
      throw e;
    }
  }
}

async function printSchema(baseDir: string, dirent: Dirent): Promise<void> {
  const filePath = join(baseDir, dirent.name);
  const relativePath = relative(rootDir, filePath).split(sep).join(posix.sep);
  const { default: schema } = await import("file://" + filePath);
  const outputPath = join(
    publicDir,
    relativePath.replace(".schema.js", ".schema.json")
  );
  await mkdirIfNotExists(dirname(outputPath));
  const jsonSchema = Type.Strict(schema);
  jsonSchema["$schema"] = "https://json-schema.org/draft/2019-09/schema";
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
