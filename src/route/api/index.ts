import initRefreshIndexRoute from "./refresh-index.js";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  initRefreshIndexRoute(server);
}
