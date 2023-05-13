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
    fastify.decorate("indexJson", async function (): Promise<void> {
      const { path } = this.config;
      const index = await this.db.keyValue.findUnique({
        where: { key: "index" }
      });
      if (index) {
        return;
      }
      try {
        await indexJson({ fastify, path, logger: pluginLogger });
      } catch (err) {
        pluginLogger.error({ err });
      } finally {
        await this.db.keyValue.delete({ where: { key: "index" } });
      }
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
    indexJson: () => Promise<void>;
  }
}
