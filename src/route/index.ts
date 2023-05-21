import initApiRoutes from "./api/index.js";
import initProjectRoutes from "./project/index.js";

import type { Server } from "#server";

export function initRoutes(server: Server): void {
  initApiRoutes(server);
  initProjectRoutes(server);
  server.setNotFoundHandler(async (req, res) =>
    res.code(404).nextRender("/_error")
  );
}
