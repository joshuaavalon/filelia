import { Type } from "@sinclair/typebox";
import data from "@filelia/plugin-data/schema";
import database from "@filelia/plugin-database/schema";
import image from "@filelia/plugin-image/schema";
import index from "@filelia/plugin-index/schema";
import validation from "@filelia/plugin-validation/schema";
import server from "./server.js";

export const schema = Type.Object({
  server,
  data,
  database,
  image,
  index,
  validation
});
