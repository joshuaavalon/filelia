import type { FastifyInstance } from "fastify";
import type { PrismaClient } from "@prisma/client";

declare module "http" {
  interface IncomingMessage {
    fastify: () => FastifyInstance;
  }
}

declare module "fastify" {
  import("../../../dist/plugin/validation");
  import("../../../dist/plugin/database");
  import("../../../dist/plugin/index");
  type ValidateFuncs = import("../../../dist/plugin/validation/json-schema/index").ValidateFuncs;
  type Schemas = import("../../../dist/plugin/validation/json-schema/index").Schemas;
}


declare module "filelia" {
}
