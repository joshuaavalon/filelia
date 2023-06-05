import createFastify from "fastify";
import { v4 as uuid } from "uuid";
import cookiePlugin from "@fastify/cookie";
import helmetPlugin from "@fastify/helmet";
import nextJs from "@fastify/nextjs";
import imagePlugin from "@filelia/plugin-image";
import databasePlugin from "@filelia/plugin-database";
import dataPlugin from "@filelia/plugin-data";
import indexPlugin from "@filelia/plugin-index";
import validationPlugin from "@filelia/plugin-validation";
import { initRoutes } from "#route";

import type { FastifyInstance } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { Config } from "@filelia/config";

const nextPlugin = nextJs.default;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function createServer(config: Config) {
  const { database, server, index, validation } = config;
  const fastify = createFastify({
    logger: server.logger,
    trustProxy: server.trustProxy,
    genReqId: () => uuid(),
    disableRequestLogging: !server.requestLog
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
  await fastify.register(validationPlugin, validation);
  await fastify.register(dataPlugin);
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
      fastify.next("/search");
      fastify.next("/project/*");
      fastify.next("/tags");
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
