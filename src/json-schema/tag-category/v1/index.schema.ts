import { Type } from "@sinclair/typebox";
import getId from "#json-schema/utils/get-id";

export const $id = getId(import.meta.url);
const schema = Type.Object(
  {
    $schema: Type.Literal($id),
    id: Type.String({ format: "uuid" }),
    alias: Type.Array(Type.String(), { uniqueItems: true })
  },
  {
    title: "TagCategory",
    $id,
    unevaluatedProperties: false
  }
);

export default schema;
