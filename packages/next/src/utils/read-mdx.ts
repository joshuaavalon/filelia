import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

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
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
        development: false
      }
    });
  } catch (e: any) {
    if (e.code !== "ENOENT") {
      // TODO: Log error
      console.log({ e });
    }
    return null;
  }
}
