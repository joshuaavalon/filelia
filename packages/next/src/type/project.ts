import type { Project as PrismaProject, ProjectType } from "@prisma/client";
import type { Tag } from "./tag";

export type Project = PrismaProject & {
  tags: Tag[];
  types: ProjectType[];
};
