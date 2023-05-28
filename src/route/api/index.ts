import initRefreshRoute from "./refresh.js";
import initSearchRoute from "./search.js";
import initTagsRoute from "./tags.js";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  initRefreshRoute(server);
  initSearchRoute(server);
  initTagsRoute(server);
}
