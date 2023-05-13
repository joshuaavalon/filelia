import { Type } from "@sinclair/typebox";
import createPlugin from "#plugin";
import { LocalStorage, localStorageOptionsSchema } from "./local/index.js";

import type { Static } from "@sinclair/typebox";
import type { Storage } from "./storage.js";

export const optionsSchema = Type.Union([localStorageOptionsSchema]);

export type StoragePluginOptions = Static<typeof optionsSchema>;

const name = "@garoudev/plugin-storage";
const plugin = createPlugin(
  async (fastify, options) => {
    const { type } = options;
    const pluginLogger = fastify.log.child({ plugin: name });
    pluginLogger.debug(`Using storage type (${type})`);
    try {
      switch (type) {
        case "local":
          fastify.decorate("storage", new LocalStorage(options));
          break;
        default:
          pluginLogger.fatal(`Unknown storage type (${type})`);
          await fastify.close();
      }
    } catch (e) {
      if (e instanceof Error) {
        pluginLogger.fatal(e.message);
      } else {
        pluginLogger.fatal(`Unknown storage type (${type})`);
        throw e;
      }
      await fastify.close();
    }
  },
  {
    name,
    optionsSchema
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    storage: Storage;
  }
}
