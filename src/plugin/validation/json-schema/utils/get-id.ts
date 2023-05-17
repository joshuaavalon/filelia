import { fileURLToPath } from "node:url";
import { posix, relative, sep } from "node:path";

const rootDir = fileURLToPath(new URL("..", import.meta.url));

export function getId(importMeta: string): string {
  const filePath = fileURLToPath(new URL(importMeta));
  const relativePath = relative(rootDir, filePath)
    .split(sep)
    .join(posix.sep)
    .replace(".schema.js", ".schema.json");
  return `https://joshuaavalon.github.io/filelia/${relativePath}`;
}
