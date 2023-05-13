import { Type } from "@sinclair/typebox";
import { PrismaClient } from "@prisma/client";
import createPlugin from "#plugin";

import type { Static } from "@sinclair/typebox";

export const optionsSchema = Type.Object({
  url: Type.Optional(
    Type.String({ description: "[FILELIA__DATABASE__URL] Database Url." })
  )
});

export type DatabasePluginOptions = Static<typeof optionsSchema>;
export type { PrismaClient as Database } from "@prisma/client";

const name = "@garoudev/plugin-database";
const plugin = createPlugin(
  async (fastify, options) => {
    const { url } = options;
    const db = new PrismaClient({
      datasources: url ? { db: { url } } : undefined,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
      ]
    });
    const pluginLogger = fastify.log.child({ plugin: name });
    db.$on("query", e => {
      const { query, params, duration } = e;
      pluginLogger.debug({ query, params, duration });
    });
    db.$on("error", e => pluginLogger.error(e.message));
    db.$on("info", e => pluginLogger.info(e.message));
    db.$on("warn", e => pluginLogger.warn(e.message));
    fastify.decorate("db", db);
  },
  {
    name,
    optionsSchema
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
