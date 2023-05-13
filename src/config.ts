import readEnvVars from "read-env-vars";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { optionsSchema as database } from "#plugin/database";
import { optionsSchema as index } from "#plugin/index";

import type { Static } from "@sinclair/typebox";
import type { ValueError } from "@sinclair/typebox/compiler";

const userConfigSchema = Type.Object({
  port: Type.Optional(Type.Number()),
  logging: Type.Optional(Type.Boolean()),
  database: Type.Optional(database),
  next: Type.Optional(Type.Boolean()),
  index
});
const userConfigSchemaValidator = TypeCompiler.Compile(userConfigSchema);

const configSchema = Type.Object({
  port: Type.Number({ default: 8080 }),
  logging: Type.Boolean({ default: true }),
  database: Type.Optional(database),
  next: Type.Boolean({ default: true }),
  index
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
  const values = readEnvVars("FILELIA");
  const errors = [...userConfigSchemaValidator.Errors(values)];
  if (errors.length <= 0) {
    const config = Value.Cast(configSchema, values);
    return { config };
  }
  return { config: null, errors };
}
