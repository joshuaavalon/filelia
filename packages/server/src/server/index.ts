import createFastify from "fastify";
import { v4 as uuid } from "uuid";
import cookiePlugin from "@fastify/cookie";
import helmetPlugin from "@fastify/helmet";
import nextJs from "@fastify/nextjs";
import filePlugin from "@filelia/plugin-file";
import imagePlugin from "@filelia/plugin-image";
import databasePlugin from "@filelia/plugin-database";
import apiPlugin from "@filelia/plugin-api";
import indexPlugin from "@filelia/plugin-index";
import { initRoutes } from "#route";

import type { FastifyInstance } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { Config } from "@filelia/config";

const nextPlugin = nextJs.default;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function createServer(config: Config) {
  const { server } = config;
  const isDev = process.env.NODE_ENV !== "production";
  const fastify = createFastify({
    logger: server.logger,
    trustProxy: server.trustProxy,
    genReqId: () => uuid(),
    disableRequestLogging: !server.requestLog,
    pluginTimeout: isDev ? 120000 : undefined
  }).withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(cookiePlugin, {
    secret: server.secret,
    parseOptions: {
      httpOnly: true,
      signed: true,
      sameSite: "strict",
      secure: "auto"
    }
  });
  await fastify.register(helmetPlugin, { global: false });
  await fastify.register(databasePlugin, config.database);
  await fastify.register(filePlugin, config.file);
  await fastify.register(imagePlugin, config.image);
  await fastify.register(indexPlugin, config.index);
  await fastify.register(apiPlugin, config.api);
  if (!server.testing) {
    fastify.addHook("onRequest", async req => {
      req.raw.fastify = () => req.server;
    });
    await fastify.register(nextPlugin, {
      dir: "../next",
      // https://github.com/vercel/next.js/issues/50315
      customServer: false
    });
    fastify.after(() => {
      fastify.next("/");
      fastify.next("/next/*");
      fastify.next("/search/");
      fastify.next("/project/*");
      fastify.next("/tags/");
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
