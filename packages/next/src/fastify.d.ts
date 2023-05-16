import type { FastifyInstance } from "fastify";
import type { PrismaClient } from "@prisma/client";

declare module "http" {
  interface IncomingMessage {
    fastify: () => FastifyInstance;
  }
}

declare module "fastify" {
  import("../../../dist/plugin/json-schema");
  import("../../../dist/plugin/database");
  import("../../../dist/plugin/index");
}
