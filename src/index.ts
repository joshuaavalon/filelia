import dotenv from "dotenv";
import { pino } from "pino";
import { createServer } from "./server.js";
import { readConfig } from "./config.js";

async function main(): Promise<void> {
  dotenv.config();
  const cfgResult = readConfig();
  if (!cfgResult.config) {
    const { errors } = cfgResult;
    const logger = pino();
    logger.fatal({ errors }, "Invalid config");
    return;
  }
  const { config } = cfgResult;
  const { port } = config;
  const fastify = await createServer(config);
  fastify.listen({ port }, err => {
    if (err) {
      fastify.log.fatal(err);
      process.exit(1);
    }
  });
}

main();
