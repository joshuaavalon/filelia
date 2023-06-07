import dotenv from "dotenv";
import { pino } from "pino";
import { readConfig } from "@filelia/config";
import { createServer } from "#server";

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
    server: { host, port }
  } = config;
  const fastify = await createServer(config);
  fastify.addHook("onReady", async function () {
    await this.db.keyValue.deleteMany();
    await this.db.tag.deleteMany();
    await this.db.project.deleteMany();
    await this.indexJson();
  });
  fastify.listen({ host, port }, err => {
    if (err) {
      fastify.log.fatal(err);
      process.exit(1);
    }
  });
}

main();
