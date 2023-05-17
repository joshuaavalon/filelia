import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { Type } from "@sinclair/typebox";
import { ValidationError } from "#error";
import { sendImage } from "#utils";

import type { Server } from "#server";

export default function initOriginRoute(server: Server): void {
  server.get(
    "/generic-project/:projectId/gallery/*",
    {
      schema: {
        params: Type.Object({ projectId: Type.String(), "*": Type.String() }),
        querystring: Type.Object({
          h: Type.Optional(Type.Number({ minimum: 1 })),
          w: Type.Optional(Type.Number({ minimum: 1 })),
          format: Type.Optional(
            Type.Union([
              Type.Literal("webp"),
              Type.Literal("jpg"),
              Type.Literal("png")
            ])
          )
        })
      }
    },
    async function (req, res) {
      const {
        params: { projectId, "*": path },
        query
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
      const rs = createReadStream(filePath);
      let shp = sharp();
      if (query.w || query.h) {
        shp = shp.resize({
          width: query.w,
          height: query.h,
          fit: sharp.fit.inside,
          withoutEnlargement: true
        });
      }
      if (query.format) {
        switch (query.format) {
          case "png":
            shp = shp.png({ progressive: true, compressionLevel: 5 });
            break;
          case "jpg":
            shp = shp.jpeg();
            break;
          case "webp":
            shp = shp.webp({ lossless: true });
            break;
        }
      }
      const buffer = await rs.pipe(shp).toBuffer();
      return await sendImage(req, res, buffer);
    }
  );
}
