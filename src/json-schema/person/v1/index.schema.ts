import { Type } from "@sinclair/typebox";
import site from "#json-schema/common/site/v1";
import getId from "#json-schema/utils/get-id";

export const $id = getId(import.meta.url);
const schema = Type.Object(
  {
    $schema: Type.Literal($id),
    id: Type.String({ format: "uuid" }),
    name: Type.String(),
    sites: Type.Array(Type.Ref(site), { uniqueItems: true })
  },
  {
    title: "Person",
    $id,
    unevaluatedProperties: false
  }
);

export default schema;
