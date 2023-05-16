import readEnvVars from "read-env-vars";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import database from "#plugin/database/schema";
import index from "#plugin/index/schema";
import jsonSchema from "#plugin/json-schema/schema";
import server from "./server.js";

import type { Static } from "@sinclair/typebox";
import type { ValueError } from "@sinclair/typebox/compiler";

const ajv = new Ajv.default({ useDefaults: true });
addFormats.default(ajv);
ajv.addKeyword({
  keyword: "env",
  schemaType: "string"
});

const schema = Type.Object({
  server,
  database,
  index,
  jsonSchema
});
const validate = ajv.compile(schema);
const validator = TypeCompiler.Compile(schema);

export type Config = Static<typeof schema>;
export type ReadConfigResult =
  | {
      config: Config;
      errors: null;
    }
  | {
      config: null;
      errors: ValueError[];
    };

export function readConfig(): ReadConfigResult {
  const values = readEnvVars("FILELIA");
  const keys = Object.keys(Type.Strict(schema).properties);
  for (const key of keys) {
    if (!(key in values)) {
      values[key] = {};
    }
  }
  if (!validate(values)) {
    const errors = [...validator.Errors(values)];
    return { config: null, errors };
  }
  const config = values as Config;
  return { config, errors: null };
}
