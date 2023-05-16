import { Type } from "@sinclair/typebox";

const schema = Type.Object(
  {
    url: Type.String({
      description: "Database connection string",
      env: "FILELIA__DATABASE__URL"
    })
  },
  {
    description: "Database related configuration"
  }
);

export default schema;
