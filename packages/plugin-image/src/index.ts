import createPlugin from "@filelia/plugin";
import optionsSchema from "./schema.js";
import { transformImage } from "./transform-image.js";
import { detectImage } from "./detect-image.js";

const name = "@filelia/plugin-image";
const plugin = createPlugin(
  async fastify => {
    fastify.decorate("transformImage", transformImage);
    fastify.decorate("detectImage", detectImage);
  },
  {
    name,
    optionsSchema
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    transformImage: typeof transformImage;
    detectImage: typeof detectImage;
  }
}
