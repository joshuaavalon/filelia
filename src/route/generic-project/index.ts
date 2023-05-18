import initFileRoutes from "./file.js";
import initGalleryRoutes from "./gallery.js";

import type { Server } from "#server";

export default function initRoutes(server: Server): void {
  initFileRoutes(server);
  initGalleryRoutes(server);
}
