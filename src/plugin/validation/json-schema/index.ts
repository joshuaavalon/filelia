import Ajv from "ajv/dist/2019.js";
import addFormats from "ajv-formats";
import genericProject from "./generic-project/v1/index.schema.js";
import person from "./person/v1/index.schema.js";
import project from "./project/v1/index.schema.js";
import tag from "./tag/v1/index.schema.js";
import tagCategory from "./tag-category/v1/index.schema.js";

import type { Static } from "@sinclair/typebox";
import type { ValidateFunction } from "ajv/dist/2019.js";

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

export const validateFuncs = {
  [genericProject.type]: compile(genericProject.type),
  [person.type]: compile(person.type),
  [project.type]: compile(project.type),
  [tag.type]: compile(tag.type),
  [tagCategory.type]: compile(tagCategory.type)
} as const;

export type ValidateFuncs = typeof validateFuncs;
