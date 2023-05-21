import createPlugin from "#plugin";
import optionsSchema from "./schema.js";
import loadProject from "./load-project.js";
import loadProjectDir from "./load-project-dir.js";

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
    dependencies: ["@filelia/plugin-validation", "@filelia/plugin-database"]
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    loadProject: typeof loadProject;
    loadProjectDir: typeof loadProjectDir;
  }
}
