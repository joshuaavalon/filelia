import type { Schemas } from "fastify";
import type { Static } from "@sinclair/typebox";
import type { Project, Tag } from "@prisma/client";

export interface SearchProject extends Pick<Project, "id" | "path" | "name"> {
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  data?: Static<Schemas["project"]>;
}
