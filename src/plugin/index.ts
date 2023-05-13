import fp from "fastify-plugin";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { Value } from "@sinclair/typebox/value";

import type { FastifyPluginAsync, RawServerDefault } from "fastify";
import type { PluginMetadata } from "fastify-plugin";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { Static, TSchema } from "@sinclair/typebox";

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
  const validator = TypeCompiler.Compile(optionsSchema);
  const wrapFn: Plugin<T> = async (fastify, options) => {
    const withDefault = Value.Cast(optionsSchema, options) as PluginSchema<T>;
    const plugin = metadata.name ?? "<Unknown Plugin>";
    fastify.log.debug({ plugin }, "Initializing Plugin");
    const errors = [...validator.Errors(withDefault)];
    if (errors.length > 0) {
      fastify.log.fatal(
        { plugin, errors },
        "Failed to initialize plugin because of invalid options"
      );
      await fastify.close();
      return;
    }
    await fn(fastify, withDefault);
  };
  return fp(wrapFn, metadata);
}
