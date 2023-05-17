import { schemaList } from "./json-schema/index.js";

export function validateSchemas(): typeof schemaList {
  return schemaList;
}
