import { dirname, join } from "node:path";

import type { FastifyInstance } from "fastify";

export default async function loadProjectDir(
  this: FastifyInstance,
  projectId: string
): Promise<string | null> {
  const result = await this.loadProject(projectId);
  if (!result) {
    return null;
  }
  const { data, project } = result;
  return join(dirname(project.path), data.baseDir ?? ".");
}
