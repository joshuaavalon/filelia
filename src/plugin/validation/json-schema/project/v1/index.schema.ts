import { Type } from "@sinclair/typebox";
import { getId } from "#plugin/validation/json-schema/utils";

const type = "project" as const;

const schema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    title: Type.String(),
    tags: Type.Array(Type.String(), { uniqueItems: true }),
    createdAt: Type.String({ format: "date" }),
    updatedAt: Type.String({ format: "date" }),
    baseDir: Type.String({ default: "." }),
    gallery: Type.Array(Type.String()),
    files: Type.Array(Type.String()),
    description: Type.String({ default: "README.md" })
  },
  {
    title: "Project",
    $id: getId(import.meta.url),
    $schema: "https://json-schema.org/draft/2019-09/schema"
  }
);

export default { type, schema };
