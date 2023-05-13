import initOriginRoute from "./origin.js";
import initStaticRoute from "./static.js";

import type { Server } from "#server";

export default function initImageRoutes(server: Server): void {
  initOriginRoute(server);
  initStaticRoute(server);
}
