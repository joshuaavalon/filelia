import type { Project as FileliaProject } from "fastify";
import type { Project, Tag } from "@prisma/client";

export interface SearchProject extends Pick<Project, "id" | "path" | "name"> {
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  data?: FileliaProject;
}
