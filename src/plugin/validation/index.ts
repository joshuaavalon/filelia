import createPlugin from "#plugin";
import optionsSchema from "./schema.js";
import { validateFunc } from "./validate-func.js";
import { validateSchemas } from "./validate-schemas.js";

const name = "@filelia/plugin-validation";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("validateFunc", validateFunc);
    fastify.decorate("validateSchemas", validateSchemas);
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
    validateSchemas: typeof validateSchemas;
  }
}
