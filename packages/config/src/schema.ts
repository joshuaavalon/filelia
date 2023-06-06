import { Type } from "@sinclair/typebox";
import file from "@filelia/plugin-file/schema";
import api from "@filelia/plugin-api/schema";
import database from "@filelia/plugin-database/schema";
import image from "@filelia/plugin-image/schema";
import index from "@filelia/plugin-index/schema";
import server from "./server.js";

export const schema = Type.Object({
  server,
  api,
  file,
  database,
  image,
  index
});
