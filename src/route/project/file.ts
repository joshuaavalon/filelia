import { createReadStream } from "node:fs";
import { access, constants } from "node:fs/promises";
import { join } from "node:path";
import { Type } from "@sinclair/typebox";
import { getContentType } from "#utils";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  server.get(
    "/project/:projectId/file/*",
    {
      schema: {
        params: Type.Object({ projectId: Type.String(), "*": Type.String() })
      }
    },
    async function (req, res) {
      const {
        params: { projectId, "*": path }
      } = req;
      const baseDir = await this.loadProjectDir(projectId);
      if (!baseDir) {
        return res.callNotFound();
      }
      const filePath = join(baseDir, path);
      try {
        await access(filePath, constants.F_OK);
      } catch (err) {
        req.log.warn({ err }, "Failed to load file");
        return res.callNotFound();
      }
      return res
        .code(200)
        .type(getContentType(filePath) ?? "application/octet-stream")
        .send(createReadStream(filePath));
    }
  );
}
