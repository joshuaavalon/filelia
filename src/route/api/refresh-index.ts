import { sendJson } from "#utils/send";

import type { Server } from "#server";

export default function initOriginRoute(server: Server): void {
  server.post("/api/refresh", {}, async (req, res) => {
    req.server.indexJson();
    sendJson(req, res, { success: true });
  });
}
