import createPlugin from "@filelia/plugin";
import optionsSchema from "./schema.js";
import validateProject from "./validate-project.js";

const name = "@filelia/plugin-validation";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("validateProject", validateProject);
  },
  {
    name,
    optionsSchema
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    validateProject: typeof validateProject;
  }
}
