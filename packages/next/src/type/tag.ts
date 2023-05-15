import type { Tag as PrismaTag, TagAlias } from "@prisma/client";
import type { TagCategory } from "./tag-category";

export type Tag = PrismaTag & {
  alias: TagAlias[];
  tagCategory: TagCategory;
};
