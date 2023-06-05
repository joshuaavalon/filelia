import type { FastifyBaseLogger, FastifyInstance } from "fastify";

export interface IndexJsonOptions {
  fastify: FastifyInstance;
  path: string;
  logger: FastifyBaseLogger;
}
