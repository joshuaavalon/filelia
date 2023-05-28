import { Type } from "@sinclair/typebox";
import { sendJson } from "#utils/send";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  server.get(
    "/api/search",
    {
      schema: {
        querystring: Type.Object({
          tags: Type.Optional(Type.Array(Type.String())),
          keywords: Type.Optional(Type.Array(Type.String())),
          notTags: Type.Optional(Type.Array(Type.String())),
          notKeywords: Type.Optional(Type.Array(Type.String()))
        })
      }
    },
    async (req, res) => {
      const { query } = req;
      const {
        tags = [],
        keywords = [],
        notTags = [],
        notKeywords = []
      } = query;
      let projects = await req.server.db.project.findMany({
        include: {
          _count: {
            select: { tags: { where: { name: { in: tags, notIn: notTags } } } }
          }
        },
        where: {
          tags: {
            some: { name: { in: tags } },
            none: { name: { in: notTags } }
          },
          AND: [
            ...keywords.map(keyword => ({ name: { contains: keyword } })),
            ...notKeywords.map(keyword => ({
              name: { not: { contains: keyword } }
            }))
          ]
        }
      });
      projects = projects.sort();
      return sendJson(req, res, { projects });
    }
  );
}
