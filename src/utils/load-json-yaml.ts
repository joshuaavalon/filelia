import { readFile } from "node:fs/promises";
import yaml from "js-yaml";

export async function loadJsonYaml(path: string): Promise<unknown> {
  const text = await readFile(path, { encoding: "utf-8" });
  return /\.filelia\.json$/iu.test(path)
    ? JSON.parse(text)
    : yaml.load(text, { json: true, schema: yaml.JSON_SCHEMA });
}
