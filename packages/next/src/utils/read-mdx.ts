import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { serialize } from "next-mdx-remote/serialize";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface ReadMdxOptions {
  projectPath: string;
  baseDir: string;
  filePath: string;
}
export default async function readMdx(
  projectPath: string,
  baseDir: string,
  filePath: string
): Promise<MDXRemoteSerializeResult | null> {
  const path = join(dirname(projectPath), baseDir, filePath);
  try {
    const content = await readFile(path, { encoding: "utf-8" });
    return serialize(content, {
      parseFrontmatter: true,
      mdxOptions: { development: false }
    });
  } catch (e) {
    // TODO: Log error
    console.log({ e });
    return null;
  }
}
