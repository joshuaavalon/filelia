import createPlugin from "@filelia/plugin";
import optionsSchema from "./schema.js";
import loadProject from "./load-project.js";
import loadProjectDir from "./load-project-dir.js";

import type {} from "@filelia/plugin-database";
import type {} from "@filelia/plugin-file";
import type {} from "@filelia/plugin-validation";
export type { LoadProjectResult } from "./load-project.js";

const name = "@filelia/plugin-data";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("loadProject", loadProject.bind(fastify));
    fastify.decorate("loadProjectDir", loadProjectDir.bind(fastify));
  },
  {
    name,
    optionsSchema,
    dependencies: [
      "@filelia/plugin-database",
      "@filelia/plugin-file",
      "@filelia/plugin-validation"
    ]
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    loadProject: OmitThisParameter<typeof loadProject>;
    loadProjectDir: OmitThisParameter<typeof loadProjectDir>;
  }
}
