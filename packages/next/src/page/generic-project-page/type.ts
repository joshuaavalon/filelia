import type { Schemas } from "fastify";
import type { Project } from "#type";
import type { Static } from "@sinclair/typebox";

export type GenericProject = Static<Schemas["filelia::generic-project::v1"]>;

export interface GenericProjectContext {
  project: Project;
  json: GenericProject;
}
