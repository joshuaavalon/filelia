import { Type } from "@sinclair/typebox";
import getId from "#json-schema/utils/get-id";

export const $id = getId(import.meta.url);
const schema = Type.Object(
  {
    $schema: Type.Literal($id),
    id: Type.String({ format: "uuid" }),
    category: Type.String(),
    alias: Type.Array(Type.String(), { uniqueItems: true })
  },
  {
    title: "Tag",
    $id,
    unevaluatedProperties: false
  }
);

export default schema;
