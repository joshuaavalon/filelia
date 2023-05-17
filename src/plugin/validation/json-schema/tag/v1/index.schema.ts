import { Type } from "@sinclair/typebox";
import { getId } from "#plugin/validation/json-schema/utils";

const type = "filelia::tag::v1" as const;

const schema = Type.Object(
  {
    filelia: Type.Array(Type.String(), {
      uniqueItems: true,
      contains: { const: type },
      default: [type]
    }),
    id: Type.String({ format: "uuid" }),
    category: Type.String(),
    alias: Type.Array(Type.String(), { uniqueItems: true, minItems: 1 })
  },
  {
    title: "Tag",
    $id: getId(import.meta.url),
    $schema: "https://json-schema.org/draft/2019-09/schema"
  }
);

export default { type, schema, order: 1 };
