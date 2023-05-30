import type { ParsedUrlQuery } from "querystring";

function toArray(value: string | string[] | undefined): string[] {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export default function mapQuery(
  query: ParsedUrlQuery
): Record<string, string[]> {
  return Object.entries(query).reduce((acc, cur) => {
    const [key, value] = cur;
    acc[key] = toArray(value);
    return acc;
  }, {} as Record<string, string[]>);
}
