import { Type } from "@sinclair/typebox";

const schema = Type.Object(
  {
    label: Type.String(),
    value: Type.String(),
    link: Type.Optional(Type.String()),
    icon: Type.Optional(Type.String())
  },
  {
    title: "Metadata"
  }
);

export default schema;
