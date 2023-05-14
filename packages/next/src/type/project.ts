import type {
  Project as PrismaProject,
  Tag,
  TagAlias,
  TagCategory,
  TagCategoryAlias
} from "@prisma/client";

export type Project = PrismaProject & {
  tags: (Tag & {
    alias: TagAlias[];
    tagCategory: TagCategory & {
      alias: TagCategoryAlias[];
    };
  })[];
};
