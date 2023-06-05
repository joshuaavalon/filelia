import fp from "fastify-plugin";
import { compileAjv, createAjv } from "@filelia/ajv";
import { ValidationError } from "@filelia/error";

import type { FastifyPluginAsync, RawServerDefault } from "fastify";
import type { PluginMetadata } from "fastify-plugin";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { Static, TSchema } from "@sinclair/typebox";

const ajv = createAjv({ useDefaults: true });

type PluginSchema<T extends TSchema> = Static<T> extends Record<string, any>
  ? Static<T>
  : never;

type PluginOptions<T extends TSchema> = Static<T> extends Record<string, any>
  ? PluginMetadata & { optionsSchema: T }
  : never;

export type Plugin<T extends TSchema> = FastifyPluginAsync<
  PluginSchema<T>,
  RawServerDefault,
  TypeBoxTypeProvider
>;

export default function createPlugin<T extends TSchema>(
  fn: Plugin<T>,
  options: PluginOptions<T>
): Plugin<T> {
  const { optionsSchema, ...metadata } = options;
  if (!metadata.fastify) {
    metadata.fastify = "4.x";
  }
  const validate = compileAjv(ajv, optionsSchema);
  const wrapFn: Plugin<T> = async (fastify, options) => {
    const plugin = metadata.name ?? "<Unknown Plugin>";
    const pluginLogger = fastify.log.child({ plugin });
    pluginLogger.debug({ plugin }, "Initializing Plugin");
    if (!validate(options)) {
      pluginLogger.fatal(
        { err: new ValidationError(validate.errors, validate.schema) },
        "Failed to initialize plugin because of invalid options"
      );
      await fastify.close();
      return;
    }
    await fn(fastify, options);
  };
  return fp(wrapFn, metadata);
}
