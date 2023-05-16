import createPlugin from "#plugin";
import optionsSchema from "./schema.js";
import { getProjectSchema } from "./project-schema.js";

const name = "@filelia/plugin-json-schema";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("getProjectSchema", getProjectSchema);
  },
  {
    name,
    optionsSchema
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    getProjectSchema: typeof getProjectSchema;
  }
}
