import readEnvVars from "read-env-vars";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { optionsSchema as database } from "#plugin/database";
import { optionsSchema as storage } from "#plugin/storage";

import type { Static } from "@sinclair/typebox";
import type { ValueError } from "@sinclair/typebox/compiler";

const userConfigSchema = Type.Object({
  port: Type.Optional(Type.Number()),
  logging: Type.Optional(Type.Boolean()),
  storage,
  database: Type.Optional(database),
  next: Type.Optional(Type.Boolean())
});
const userConfigSchemaValidator = TypeCompiler.Compile(userConfigSchema);

const configSchema = Type.Object({
  port: Type.Number({ default: 8080 }),
  logging: Type.Boolean({ default: true }),
  storage,
  database: Type.Optional(database),
  next: Type.Boolean({ default: true })
});

export type Config = Static<typeof configSchema>;
export type ReadConfigResult =
  | {
      config: Config;
    }
  | {
      config: null;
      errors: ValueError[];
    };

export function readConfig(): ReadConfigResult {
  const values = readEnvVars("GAROU");
  const errors = [...userConfigSchemaValidator.Errors(values)];
  if (errors.length <= 0) {
    const config = Value.Cast(configSchema, values);
    return { config };
  }
  return { config: null, errors };
}
