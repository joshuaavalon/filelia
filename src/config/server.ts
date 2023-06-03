import { Type } from "@sinclair/typebox";

const schema = Type.Object(
  {
    host: Type.String({
      description: "Listen host",
      env: "FILELIA__SERVER__HOST",
      default: "127.0.0.1"
    }),
    port: Type.Number({
      description: "Listen port",
      env: "FILELIA__SERVER__PORT",
      default: 8080
    }),
    logger: Type.Boolean({
      description: "Enable logging",
      env: "FILELIA__SERVER__LOGGER",
      default: true
    }),
    trustProxy: Type.Boolean({
      description:
        "Filelia trusts proxy headers. Needed if behind reverse proxy.",
      env: "FILELIA__SERVER__TRUST_PROXY",
      default: true
    }),
    testing: Type.Boolean({
      description: "Configure Filelia for testing",
      env: "FILELIA__SERVER__TESTING",
      default: false
    }),
    requestLog: Type.Boolean({
      description: "Log every requests",
      env: "FILELIA__SERVER__REQUEST_LOG",
      default: true
    })
  },
  {
    description: "Server related configuration"
  }
);

export default schema;
