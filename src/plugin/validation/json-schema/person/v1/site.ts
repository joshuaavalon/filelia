import { Type } from "@sinclair/typebox";
import { getId } from "#plugin/validation/json-schema/utils";

export const schema = Type.Object(
  {
    type: Type.String({ minLength: 1 }),
    id: Type.String({ minLength: 1 }),
    name: Type.Optional(Type.String({ minLength: 1 })),
    url: Type.Optional(Type.String({ minLength: 1 }))
  },
  {
    title: "Site",
    $id: getId(import.meta.url),
    $schema: "https://json-schema.org/draft/2019-09/schema"
  }
);

export default schema;
