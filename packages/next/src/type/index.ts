import type { Schemas } from "fastify";
import type { Static } from "@sinclair/typebox";
import type { Project, Tag } from "@prisma/client";

export interface LoadProjectResult {
  data: Static<Schemas["project"]>;
  project: Pick<Project, "id" | "path">;
}

export interface SearchProject extends Pick<Project, "id" | "path" | "name"> {
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  data?: Static<Schemas["project"]>;
}

export type KeyOf<T, U> = keyof {
  [P in keyof T as T[P] extends U ? P : never]: any;
};
