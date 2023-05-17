import readEnvVars from "read-env-vars";
import Ajv from "ajv/dist/2019.js";
import addFormats from "ajv-formats";
import { Type } from "@sinclair/typebox";
import database from "#plugin/database/schema";
import index from "#plugin/index/schema";
import validation from "#plugin/validation/schema";
import server from "./server.js";

import type { Static } from "@sinclair/typebox";
import type { ErrorObject } from "ajv/dist/2019.js";

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
  validation
});
const validate = ajv.compile<Static<typeof schema>>(schema);

export type Config = Static<typeof schema>;
export type ReadConfigResult =
  | {
      config: Config;
      errors: null;
    }
  | {
      config: null;
      errors: ErrorObject[];
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
    return { config: null, errors: validate.errors ?? [] };
  }
  const config = values as Config;
  return { config, errors: null };
}
