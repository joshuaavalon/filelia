import type { FastifyInstance } from "fastify";
import type { PrismaClient } from "@prisma/client";

declare module "http" {
  interface IncomingMessage {
    fastify: () => FastifyInstance;
  }
}

declare module "fastify" {
  import("../../schema/dist");
  import("../../plugin-database/dist");
  import("../../plugin-index/dist");
  type Project = import("../../schema/dist").Project;
}
