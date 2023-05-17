import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Type } from "@sinclair/typebox";
import { ValidationError } from "#error";
import { getContentType } from "#utils";

import type { Server } from "#server";

export default function initOriginRoute(server: Server): void {
  server.get(
    "/generic-project/:projectId/file/*",
    {
      schema: {
        params: Type.Object({ projectId: Type.String(), "*": Type.String() })
      }
    },
    async function (req, res) {
      const {
        params: { projectId, "*": path }
      } = req;
      const project = await this.db.project.findUnique({
        where: {
          id: projectId,
          types: { some: { name: "filelia::generic-project::v1" } }
        }
      });
      if (!project) {
        return res.callNotFound();
      }
      let filePath: string;
      try {
        const txt = await readFile(project.path, { encoding: "utf-8" });
        const json = JSON.parse(txt) as unknown;
        const validate = this.validateFunc("filelia::generic-project::v1");
        if (!validate(json)) {
          throw new ValidationError(validate.errors, validate.schema);
        }
        filePath = join(dirname(project.path), json.baseDir ?? ".", path);
      } catch (err) {
        this.log.warn({ err, path: project.path }, "Failed to read JSON");
        return res.callNotFound();
      }
      return res
        .code(200)
        .type(getContentType(filePath) ?? "application/octet-stream")
        .send(createReadStream(filePath));
    }
  );
}
