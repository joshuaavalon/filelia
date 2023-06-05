import { ValidationError } from "@filelia/error";

import type { FastifyInstance } from "fastify";
import type { Project } from "@prisma/client";
import type { Project as FileliaProject } from "@filelia/schema";

export interface LoadProjectResult {
  data: FileliaProject;
  project: Pick<Project, "id" | "path">;
}

export default async function loadProject(
  this: FastifyInstance,
  projectId: string
): Promise<LoadProjectResult | null> {
  const pluginLogger = this.log.child({ plugin: "@filelia/plugin-data" });
  const project = await this.db.project.findUnique({
    select: { path: true, id: true },
    where: { id: projectId }
  });
  if (!project) {
    return null;
  }
  try {
    const data = await this.loadJsonYaml(project.path);
    const validate = this.validateProject();
    if (!validate(data)) {
      throw new ValidationError(validate.errors, validate.schema);
    }
    return { data, project };
  } catch (err) {
    pluginLogger.warn({ err }, "Failed to load project");
    return null;
  }
}
