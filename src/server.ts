import createFastify from "fastify";
import cookiePlugin from "@fastify/cookie";
import helmetPlugin from "@fastify/helmet";
import nextPlugin from "@fastify/nextjs";
import imagePlugin from "#plugin/image";
import databasePlugin from "#plugin/database";
import { initRoutes } from "./route/index.js";

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { Config } from "./config.js";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function createServer(config: Config) {
  const { database, logging, next } = config;
  const isDev = process.env.NODE_ENV !== "production";
  const fastify = createFastify({
    logger: logging,
    trustProxy: true,
    pluginTimeout: isDev ? 120000 : undefined
  }).withTypeProvider<TypeBoxTypeProvider>();

  fastify.decorate("config", config);
  await fastify.register(cookiePlugin, {
    secret: "TODO",
    parseOptions: {
      httpOnly: true,
      signed: true,
      sameSite: "strict",
      secure: "auto"
    }
  });
  await fastify.register(helmetPlugin, { global: false });
  await fastify.register(databasePlugin, database);
  await fastify.register(imagePlugin);
  if (next) {
    await fastify.register(nextPlugin);
    fastify.after(() => {
      fastify.next("/");
      fastify.next("/login");
    });
  }
  initRoutes(fastify);
  return fastify;
}

export type Server = Exclude<Awaited<ReturnType<typeof createServer>>, null>;

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
  }
}
