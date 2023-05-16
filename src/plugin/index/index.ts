import createPlugin from "#plugin";
import optionsSchema from "./schema.js";
import { indexJson } from "./handler/index.js";

const name = "@filelia/plugin-index";
const plugin = createPlugin(
  async (fastify, opts) => {
    const { path } = opts;
    const pluginLogger = fastify.log.child({ plugin: name });
    fastify.decorate("indexJson", async function (): Promise<void> {
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
        await this.db.keyValue.deleteMany({ where: { key: "index" } });
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
