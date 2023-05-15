import initRefreshIndexRoute from "./refresh-index.js";

import type { Server } from "#server";

export default function initApiRoutes(server: Server): void {
  initRefreshIndexRoute(server);
}
