import createPlugin from "@filelia/plugin";
import optionsSchema from "./schema.js";
import { findProjectById, searchProjects } from "./func/index.js";

import type {} from "@filelia/plugin-database";
export type * from "./func/index.js";

const name = "@filelia/plugin-api";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("findProjectById", findProjectById);
    fastify.decorate("searchProjects", searchProjects);
  },
  {
    name,
    optionsSchema,
    dependencies: ["@filelia/plugin-database"]
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    findProjectById: OmitThisParameter<typeof findProjectById>;
    searchProjects: OmitThisParameter<typeof searchProjects>;
  }
}
