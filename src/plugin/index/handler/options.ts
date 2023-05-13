import type { FastifyBaseLogger } from "fastify";
import type { Server } from "#server";

export interface IndexJsonOptions {
  fastify: Server;
  path: string;
  logger: FastifyBaseLogger;
}
