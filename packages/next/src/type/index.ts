import type { Schemas } from "fastify";
import type { Static } from "@sinclair/typebox";
import type { Project } from "@prisma/client";

export interface LoadProjectResult {
  data: Static<Schemas["project"]>;
  project: Project;
}

export interface LoadProjectResult {}
