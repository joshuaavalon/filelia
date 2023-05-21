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
  import("../../../dist/plugin/data");
  type ValidateFuncs = import("../../../dist/plugin/validation/json-schema/index").ValidateFuncs;
  type Schemas = import("../../../dist/plugin/validation/json-schema/index").Schemas;
  type LoadProjectResult = import("../../../dist/plugin/data").LoadProjectResult;
}


declare module "filelia" {
}
