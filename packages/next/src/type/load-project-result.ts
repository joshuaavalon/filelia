import type { Project as FileliaProject } from "fastify";
import type { Project } from "@prisma/client";

export interface LoadProjectResult {
  data: FileliaProject;
  project: Pick<Project, "id" | "path">;
}
