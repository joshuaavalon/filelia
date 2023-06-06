import { createReadStream } from "node:fs";
import { access, constants } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { Type } from "@sinclair/typebox";
import { sendImage } from "#utils";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  server.get(
    "/project/:projectId/gallery/*",
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
          ),
          fit: Type.Optional(
            Type.Union([
              Type.Literal("contain"),
              Type.Literal("cover"),
              Type.Literal("fill"),
              Type.Literal("inside"),
              Type.Literal("outside")
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
      const result = await this.findProjectById({ id: projectId });
      if (result.state !== "success") {
        return res.callNotFound();
      }
      const filePath = join(result.baseDir, path);
      try {
        await access(filePath, constants.R_OK);
      } catch (err) {
        req.log.warn({ err }, "Failed to load file");
        return res.callNotFound();
      }
      const rs = createReadStream(filePath);
      let shp = sharp();
      if (query.w || query.h) {
        shp = shp.resize({
          width: query.w,
          height: query.h,
          fit: query.fit ?? "inside",
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
