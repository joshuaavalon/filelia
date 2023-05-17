import createPlugin from "#plugin";
import optionsSchema from "./schema.js";
import { validateFunc } from "./validate-func.js";

const name = "@filelia/plugin-validation";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("validateFunc", validateFunc);
  },
  {
    name,
    optionsSchema
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    validateFunc: typeof validateFunc;
  }
}
