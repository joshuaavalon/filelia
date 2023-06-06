import type { Prisma } from "@prisma/client";

export interface SearchProjectsQuery {
  andTags: string[];
  orTags: string[];
  notTags: string[];
  andKeywords: string[];
  orKeywords: string[];
  notKeywords: string[];
}

export function mapWhere(query: SearchProjectsQuery): Prisma.ProjectWhereInput {
  const { andTags, orTags, notTags, andKeywords, orKeywords, notKeywords } =
    query;
  const wheres: Prisma.ProjectWhereInput[] = [];
  andTags.forEach(tag => {
    wheres.push({
      tags: { some: { name: { equals: tag } } }
    });
  });
  if (orTags.length > 0) {
    wheres.push({
      tags: {
        some: { name: { in: orTags } }
      }
    });
  }
  if (notTags.length > 0) {
    wheres.push({
      tags: {
        some: { name: { in: notTags } }
      }
    });
  }
  andKeywords.forEach(keyword => {
    wheres.push({
      OR: [
        { name: { contains: keyword } },
        { tags: { some: { name: { contains: keyword } } } }
      ]
    });
  });
  orKeywords.forEach(keyword => {
    wheres.push({
      OR: [
        { name: { contains: keyword } },
        { tags: { some: { name: { contains: keyword } } } }
      ]
    });
  });
  notKeywords.forEach(keyword => {
    wheres.push({
      name: { not: { contains: keyword } },
      OR: [{ tags: { some: { name: { not: { contains: keyword } } } } }]
    });
  });

  return {
    AND: wheres
  };
}
