import Ajv from "ajv/dist/2019.js";
import addFormats from "ajv-formats";
import project from "./project/v1/index.schema.js";

import type { Static } from "@sinclair/typebox";
import type { ValidateFunction } from "ajv/dist/2019.js";

export const schemas = {
  [project.type]: project.schema
} as const;

export type Schemas = typeof schemas;

function compile<T extends keyof Schemas>(
  key: T
): ValidateFunction<Static<Schemas[T]>> {
  const ajv = new Ajv.default({ useDefaults: true });
  addFormats.default(ajv);
  const schema = schemas[key];
  return ajv.compile<Static<Schemas[T]>>(schema);
}

type ValidateFunc<T extends keyof Schemas> = ValidateFunction<
  Static<Schemas[T]>
>;

export type ValidateFuncs = {
  [key in keyof Schemas]: ValidateFunc<key>;
};

function compileAll(): ValidateFuncs {
  return Object.keys(schemas).reduce((result, key) => {
    const schemaType = key as keyof Schemas;
    result[schemaType] = compile(schemaType);
    return result;
  }, {} as Record<keyof Schemas, any>) as ValidateFuncs;
}

export const validateFuncs = compileAll();
