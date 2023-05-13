import type { FastifyInstance } from "fastify";
import type { PrismaClient } from "@prisma/client";

declare module "http" {
  interface IncomingMessage {
    fastify: () => FastifyInstance;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
