import type {
  Tag as BaseTag,
  TagAlias,
  TagCategory,
  TagCategoryAlias
} from "@prisma/client";

export type Tag = BaseTag & {
  alias: TagAlias[];
  tagCategory: TagCategory & {
    alias: TagCategoryAlias[];
  };
};
