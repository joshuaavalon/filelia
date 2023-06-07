import { PrismaClient } from "@prisma/client";
import createPlugin from "@filelia/plugin";
import optionsSchema from "./schema.js";

export type { PrismaClient as Database } from "@prisma/client";

const name = "@filelia/plugin-database";
const plugin = createPlugin(
  async (fastify, options) => {
    const { url } = options;
    const db = new PrismaClient({
      datasources: { db: { url } },
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
    fastify.addHook("onClose", fastify => {
      fastify.db.$disconnect();
    });
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
