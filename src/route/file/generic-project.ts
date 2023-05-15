import { createReadStream } from "fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import schema from "#json-schema/generic-project/v1";
import { TypeBoxError } from "#error";
import { getContentType } from "#utils";

import type { Static } from "@sinclair/typebox";
import type { Server } from "#server";

const validator = TypeCompiler.Compile(schema);

export default function initOriginRoute(server: Server): void {
  server.get(
    "/project/generic/:projectId/file/*",
    {
      schema: {
        params: Type.Object({ projectId: Type.String(), "*": Type.String() })
      }
    },
    async (req, res) => {
      const {
        params: { projectId, "*": path },
        server: { db, log }
      } = req;
      const project = await db.project.findUnique({
        where: { id: projectId, type: "generic" }
      });
      if (!project) {
        return res.code(404).nextRender("/_error");
      }
      let genericProject: Static<typeof schema>;
      try {
        const txt = await readFile(project.path, { encoding: "utf-8" });
        const json = JSON.parse(txt);
        if (!validator.Check(json)) {
          const errors = [...validator.Errors(json)];
          throw new TypeBoxError(errors, schema);
        }
        genericProject = json;
      } catch (err) {
        log.warn({ err, path: project.path }, "Failed to read JSON");
        return res.code(404).nextRender("/_error");
      }
      const filePath = join(
        dirname(project.path),
        genericProject.baseDir ?? ".",
        path
      );
      return res
        .code(200)
        .type(getContentType(filePath) ?? "application/octet-stream")
        .send(createReadStream(filePath));
    }
  );
}
