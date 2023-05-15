import initGenericProjectFileRoute from "./generic-project.js";

import type { Server } from "#server";

export default function initFileRoutes(server: Server): void {
  initGenericProjectFileRoute(server);
}
