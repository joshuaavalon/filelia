import initApiRoutes from "./api/index.js";
import initGenericProjectRoutes from "./generic-project/index.js";

import type { Server } from "#server";

export function initRoutes(server: Server): void {
  initApiRoutes(server);
  initGenericProjectRoutes(server);
  server.setNotFoundHandler(async (req, res) =>
    res.code(404).nextRender("/_error")
  );
}
