import { dirname, join } from "node:path";
import { ValidationError } from "@filelia/error";
import { loadJsonYaml, validateProject } from "#utils";

import type { FastifyInstance } from "fastify";
import type { Project } from "@prisma/client";
import type { Project as Data } from "@filelia/schema";

export interface FindProjectByIdOptions {
  id: string;
}

export type FindProjectByIdResultSuccess = {
  baseDir: string;
  data: Data;
  project: Pick<Project, "id" | "path">;
  state: "success";
};

export type FindProjectByIdResult =
  | FindProjectByIdResultSuccess
  | {
      baseDir: null;
      data: null;
      project: null;
      state: "notFound";
    }
  | {
      baseDir: null;
      data: null;
      project: Pick<Project, "id" | "path">;
      state: "invalid";
    };

export async function findProjectById(
  this: FastifyInstance,
  opts: FindProjectByIdOptions
): Promise<FindProjectByIdResult> {
  const { id } = opts;
  const project = await this.db.project.findUnique({
    select: { path: true, id: true },
    where: { id }
  });
  if (!project) {
    return {
      baseDir: null,
      data: null,
      project,
      state: "notFound"
    };
  }

  let data: Data;
  try {
    const content = await loadJsonYaml(project.path);
    const validate = validateProject();
    if (!validate(content)) {
      throw new ValidationError(validate.errors, validate.schema);
    }
    data = content;
  } catch (err) {
    this.log.warn({ path: project.path, err }, "Failed to load project");
    return {
      baseDir: null,
      data: null,
      project,
      state: "invalid"
    };
  }
  const baseDir = join(dirname(project.path), data.baseDir ?? ".");
  return {
    baseDir,
    data,
    project,
    state: "success"
  };
}
