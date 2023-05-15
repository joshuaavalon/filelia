import type { Project as PrismaProject } from "@prisma/client";
import type { Tag } from "./tag";

export type Project = PrismaProject & {
  tags: Tag[];
};
