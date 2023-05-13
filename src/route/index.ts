import initImageRoutes from "./image/index.js";

import type { Server } from "#server";

export function initRoutes(server: Server): void {
  initImageRoutes(server);
}
