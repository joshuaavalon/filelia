import { Type } from "@sinclair/typebox";
import { getId } from "#plugin/validation/json-schema/utils";
import site from "./site.js";

const type = "filelia::person::v1" as const;

const schema = Type.Object(
  {
    filelia: Type.Array(Type.String(), {
      uniqueItems: true,
      contains: { const: type }
    }),
    id: Type.String({ format: "uuid" }),
    name: Type.String(),
    sites: Type.Array(site, { uniqueItems: true })
  },
  {
    title: "Person",
    $id: getId(import.meta.url),
    $schema: "https://json-schema.org/draft/2019-09/schema"
  }
);

export default { type, schema, order: 0 };
