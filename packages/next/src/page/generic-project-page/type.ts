import type { Schemas } from "fastify";
import type { Project } from "#type";
import type { Static } from "@sinclair/typebox";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type GenericProject = Static<Schemas["filelia::generic-project::v1"]>;

export interface GenericProjectContextValue {
  project: Project;
  genericProject: GenericProject;
  description: MDXRemoteSerializeResult | null;
}
