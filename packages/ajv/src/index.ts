import Ajv2019 from "ajv/dist/2019.js";
import addFormats from "ajv-formats";
import type { Static, TSchema } from "@sinclair/typebox";

import type { Options, ValidateFunction } from "ajv/dist/2019.js";

export type Ajv = InstanceType<typeof Ajv2019.default>;

export function createAjv(opts: Options): Ajv {
  const ajv = new Ajv2019.default(opts);
  addFormats.default(ajv);
  return ajv;
}

export function compileAjv<T extends TSchema>(
  ajv: Ajv,
  schema: T
): ValidateFunction<Static<T>> {
  return ajv.compile<Static<T>>(schema);
}
