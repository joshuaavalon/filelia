import { Type } from "@sinclair/typebox";
import getId from "#json-schema/utils/get-id";

export const $id = getId(import.meta.url);
const schema = Type.Object(
  {
    $schema: Type.Literal($id),
    id: Type.String({ format: "uuid" }),
    title: Type.String(),
    type: Type.Literal("generic"),
    tags: Type.Array(Type.String(), { uniqueItems: true }),
    baseDir: Type.String({ default: "." }),
    gallery: Type.Array(Type.String()),
    files: Type.Array(Type.String()),
    description: Type.String({ default: "README.md" })
  },
  {
    title: "Generic Project",
    $id
  }
);

export default schema;
