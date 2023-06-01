import type { Tag } from "@prisma/client";

export interface SearchTag extends Tag {
  projectCount: number;
}
