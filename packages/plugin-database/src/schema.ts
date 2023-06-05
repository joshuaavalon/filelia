import { Type } from "@sinclair/typebox";

const schema = Type.Object({
  url: Type.String({
    description: "Database connection string"
  })
});

export default schema;
