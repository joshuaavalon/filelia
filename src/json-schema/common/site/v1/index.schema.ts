import { Type } from "@sinclair/typebox";
import getId from "#json-schema/utils/get-id";

const schema = Type.Object(
  {
    type: Type.String({ minLength: 1 }),
    id: Type.String({ minLength: 1 }),
    name: Type.Optional(Type.String({ minLength: 1 })),
    url: Type.Optional(Type.String({ minLength: 1 }))
  },
  {
    title: "Site",
    $id: getId(import.meta.url),
    unevaluatedProperties: false
  }
);

export default schema;
