import { Type } from "@sinclair/typebox";
import { sendJson } from "#utils/send";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  server.get(
    "/api/tags",
    {
      schema: {
        querystring: Type.Object({
          keyword: Type.Optional(Type.String())
        })
      }
    },
    async (req, res) => {
      const { query } = req;
      const { keyword } = query;
      if (!keyword) {
        return sendJson(req, res, { tags: [] });
      }
      const tags = await req.server.db.tag.findMany({
        where: {
          name: { contains: keyword }
        },
        orderBy: {
          projects: { _count: "desc" }
        }
      });
      return sendJson(req, res, { tags });
    }
  );
}
