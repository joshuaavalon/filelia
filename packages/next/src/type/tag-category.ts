import type {
  TagCategory as PrismaTagCategory,
  TagCategoryAlias
} from "@prisma/client";

export type TagCategory = PrismaTagCategory & {
  alias: TagCategoryAlias[];
};
