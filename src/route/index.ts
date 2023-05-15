import initApiRoutes from "./api/index.js";
import initFileRoutes from "./file/index.js";
import initImageRoutes from "./image/index.js";

import type { Server } from "#server";

export function initRoutes(server: Server): void {
  initApiRoutes(server);
  initFileRoutes(server);
  initImageRoutes(server);
}
