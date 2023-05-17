import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import type { Dirent } from "node:fs";
import type { TSchema } from "@sinclair/typebox";

export interface JsonSchema {
  type: string;
  schema: TSchema;
  order: number;
}

async function importJsonSchema(
  baseDir: string,
  dirent: Dirent
): Promise<JsonSchema> {
  const filePath = join(baseDir, dirent.name);
  const { default: schema }: { default: JsonSchema } = await import(
    "file://" + filePath
  );

  return schema;
}

const schemaDir = fileURLToPath(
  new URL("../plugin/validation/json-schema", import.meta.url)
);
async function processDirectory(baseDir: string): Promise<JsonSchema[]> {
  let schemas: JsonSchema[] = [];
  const dirents = await readdir(baseDir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isFile()) {
      if (!dirent.name.endsWith(".schema.js")) {
        continue;
      }
      const schema = await importJsonSchema(baseDir, dirent);
      schemas.push(schema);
    } else if (dirent.isDirectory()) {
      const currDir = join(baseDir, dirent.name);
      schemas = schemas.concat(await processDirectory(currDir));
    }
  }
  return schemas;
}

export async function getJsonSchemas(): Promise<JsonSchema[]> {
  return await processDirectory(schemaDir);
}
