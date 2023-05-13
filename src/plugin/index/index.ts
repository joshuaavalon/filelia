import { Type } from "@sinclair/typebox";
import createPlugin from "#plugin";
import { indexJson } from "./handler/index.js";

import type { Static } from "@sinclair/typebox";

export const optionsSchema = Type.Object({});

export type DatabasePluginOptions = Static<typeof optionsSchema>;
export type { PrismaClient as Database } from "@prisma/client";

const name = "@garoudev/plugin-index";
const plugin = createPlugin(
  async fastify => {
    const pluginLogger = fastify.log.child({ plugin: name });
    fastify.decorate("indexJson", async (path: string): Promise<void> => {
      await indexJson({ fastify, path, logger: pluginLogger });
    });
  },
  {
    name,
    optionsSchema,
    decorators: {
      fastify: ["db"]
    }
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    indexJson: (path: string) => Promise<void>;
  }
}
