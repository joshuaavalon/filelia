import { Type } from "@sinclair/typebox";
import createPlugin from "#plugin";
import { transformImage } from "./transform-image.js";
import { detectImage } from "./detect-image.js";

import type { Static } from "@sinclair/typebox";

const optionsSchema = Type.Object({});

export type ImagePluginOptions = Static<typeof optionsSchema>;

const name = "@filelia/plugin-image";
const plugin = createPlugin(
  async (fastify, _options) => {
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
