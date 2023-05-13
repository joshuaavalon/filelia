import createFastify from "fastify";
import "./typebox.js";
import cookiePlugin from "@fastify/cookie";
import helmetPlugin from "@fastify/helmet";
import nextJs from "@fastify/nextjs";
import imagePlugin from "#plugin/image";
import databasePlugin from "#plugin/database";
import indexPlugin from "#plugin/index";
import { initRoutes } from "./route/index.js";

import type { FastifyInstance } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { Config } from "./config.js";

const nextPlugin = nextJs.default;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function createServer(config: Config) {
  const { database, logging, next, index } = config;
  const isDev = process.env.NODE_ENV !== "production";
  const fastify = createFastify({
    logger: logging,
    trustProxy: true,
    pluginTimeout: isDev ? 120000 : undefined
  }).withTypeProvider<TypeBoxTypeProvider>();

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
  await fastify.register(indexPlugin, index);
  if (next) {
    fastify.addHook("onRequest", async req => {
      req.raw.fastify = () => req.server;
    });
    await fastify.register(nextPlugin, { dir: "packages/next" });
    fastify.after(() => {
      fastify.next("/");
      fastify.next("/project/*");
    });
  }
  initRoutes(fastify);
  return fastify;
}

export type Server = Exclude<Awaited<ReturnType<typeof createServer>>, null>;

declare module "http" {
  interface IncomingMessage {
    fastify: () => FastifyInstance;
  }
}
