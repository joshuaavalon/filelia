import { sendJson } from "#utils/send";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  server.post("/api/refresh", {}, async (req, res) => {
    const indexing = await req.server.isIndexing();
    req.server.indexJson();
    return sendJson(req, res, { indexing });
  });
}
