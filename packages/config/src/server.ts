import { Type } from "@sinclair/typebox";

const schema = Type.Object({
  secret: Type.String({
    description: "Cookie secret"
  }),
  host: Type.String({
    description: "Listen host",
    default: "127.0.0.1"
  }),
  port: Type.Number({
    description: "Listen port",
    default: 8080
  }),
  logger: Type.Boolean({
    description: "Enable logging",
    default: true
  }),
  trustProxy: Type.Boolean({
    description:
      "Filelia trusts proxy headers. Needed if behind reverse proxy.",
    default: true
  }),
  testing: Type.Boolean({
    description: "Configure Filelia for testing",
    default: false
  }),
  requestLog: Type.Boolean({
    description: "Log every requests",
    default: true
  })
});

export default schema;
