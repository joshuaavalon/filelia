import { loadJsonYaml } from "#utils";
import { ValidationError } from "#error";

import type { Static } from "@sinclair/typebox";
import type { Project } from "@prisma/client";
import type { Server } from "#server";
import type { Schemas } from "#plugin/validation/json-schema";

export interface LoadProjectResult {
  data: Static<Schemas["project"]>;
  project: Pick<Project, "id" | "path">;
}

export default async function loadProject(
  this: Server,
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
    const data = await loadJsonYaml(project.path);
    const validate = this.validateFunc("project");
    if (!validate(data)) {
      throw new ValidationError(validate.errors, validate.schema);
    }
    return { data, project };
  } catch (err) {
    pluginLogger.warn({ err }, "Failed to load project");
    return null;
  }
}
