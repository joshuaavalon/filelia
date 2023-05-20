import { Type } from "@sinclair/typebox";
import { getId } from "#plugin/validation/json-schema/utils";
import project from "#plugin/validation/json-schema/project/v1";

const type = "filelia::generic-project::v1" as const;

const schema = Type.Object(
  {
    filelia: Type.Array(Type.String(), {
      uniqueItems: true,
      contains: { const: type },
      default: [type, project.type]
    }),
    id: Type.String({ format: "uuid" }),
    title: Type.String(),
    tags: Type.Array(Type.String(), { uniqueItems: true }),
    baseDir: Type.String({ default: "." }),
    gallery: Type.Array(Type.String()),
    files: Type.Array(Type.String()),
    description: Type.String({ default: "README.md" }),
    metadata: Type.Array(Type.Object({ type: Type.String() }), {
      uniqueItems: true
    })
  },
  {
    title: "Generic Project",
    $id: getId(import.meta.url),
    $schema: "https://json-schema.org/draft/2019-09/schema"
  }
);

export default { type, schema, order: 2 };
