import readEnvVars from "read-env-vars";
import { Type } from "@sinclair/typebox";
import { compileAjv, createAjv } from "@filelia/ajv";
import { schema } from "./schema.js";

import type { Static } from "@sinclair/typebox";
import type { ErrorObject } from "ajv/dist/2019.js";

const ajv = createAjv({ useDefaults: true });
const validate = compileAjv(ajv, schema);

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
