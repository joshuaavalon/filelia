import Ajv from "ajv/dist/2019.js";
import addFormats from "ajv-formats";
import genericProject from "./generic-project/v1/index.schema.js";
import person from "./person/v1/index.schema.js";
import project from "./project/v1/index.schema.js";
import tag from "./tag/v1/index.schema.js";
import tagCategory from "./tag-category/v1/index.schema.js";

import type { Static } from "@sinclair/typebox";
import type { ValidateFunction } from "ajv/dist/2019.js";
import type { TSchema } from "@sinclair/typebox";

export const schemaList: {
  type: string;
  schema: TSchema;
  order: number;
}[] = [genericProject, project, person, tag, tagCategory].sort(
  (a, b) => a.order - b.order
);

export const schemas = {
  [genericProject.type]: genericProject.schema,
  [person.type]: person.schema,
  [project.type]: project.schema,
  [tag.type]: tag.schema,
  [tagCategory.type]: tagCategory.schema
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
