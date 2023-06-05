import createPlugin from "@filelia/plugin";
import optionsSchema from "./schema.js";
import loadJsonYaml from "./load-json-yaml.js";

const name = "@filelia/plugin-file";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("loadJsonYaml", loadJsonYaml);
  },
  {
    name,
    optionsSchema
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    loadJsonYaml: typeof loadJsonYaml;
  }
}
