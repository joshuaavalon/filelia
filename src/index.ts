import dotenv from "dotenv";
import { pino } from "pino";
import { createServer } from "#server";
import { readConfig } from "#config";

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
  const {
    server: { port }
  } = config;
  const fastify = await createServer(config);
  fastify.addHook("onReady", async function () {
    await this.indexJson();
  });

  fastify.addHook("onClose", async instance => {
    await instance.db.keyValue.deleteMany({ where: { key: "index" } });
  });
  fastify.listen({ port }, err => {
    if (err) {
      fastify.log.fatal(err);
      process.exit(1);
    }
  });
}

main();
