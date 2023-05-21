import { dirname, join } from "node:path";

import type { Server } from "#server";

export default async function loadProjectDir(
  this: Server,
  projectId: string
): Promise<string | null> {
  const result = await this.loadProject(projectId);
  if (!result) {
    return null;
  }
  const { data, project } = result;
  return join(dirname(project.path), data.baseDir ?? ".");
}
