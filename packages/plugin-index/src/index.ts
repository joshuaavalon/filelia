import createPlugin from "@filelia/plugin";
import optionsSchema from "./schema.js";
import { indexJson } from "./handler/index.js";
import { isIndexing } from "./is-indexing.js";

import type {} from "@filelia/plugin-database";
import type {} from "@filelia/plugin-file";

const name = "@filelia/plugin-index";
const plugin = createPlugin(
  async (fastify, opts) => {
    const { path } = opts;
    const pluginLogger = fastify.log.child({ plugin: name });
    fastify.decorate("indexJson", async function (): Promise<void> {
      const index = await isIndexing(this);
      if (index) {
        return;
      }
      try {
        await this.db.keyValue.create({
          data: { key: "index", value: "true" }
        });
        await indexJson({ fastify, path, logger: pluginLogger });
      } catch (err) {
        pluginLogger.error({ err });
      } finally {
        await this.db.keyValue.deleteMany({ where: { key: "index" } });
      }
    });
    fastify.decorate("isIndexing", async function (): Promise<boolean> {
      return await isIndexing(this);
    });
  },
  {
    name,
    optionsSchema,
    dependencies: ["@filelia/plugin-database", "@filelia/plugin-file"]
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    indexJson: () => Promise<void>;
    isIndexing: () => Promise<boolean>;
  }
}
