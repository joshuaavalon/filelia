import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import remarkUnwrapImages from "remark-unwrap-images";

import type { FastifyBaseLogger } from "fastify";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface ReadMdxOptions {
  baseDir: string;
  filePath: string;
  logger: FastifyBaseLogger;
}
export default async function readMdx(
  opts: ReadMdxOptions
): Promise<MDXRemoteSerializeResult | null> {
  const { baseDir, filePath, logger } = opts;
  const path = join(baseDir, filePath);
  try {
    const content = await readFile(path, { encoding: "utf-8" });
    return serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks, remarkUnwrapImages],
        rehypePlugins: [rehypeSlug]
      }
    });
  } catch (err) {
    logger.error({ err });
    return null;
  }
}
