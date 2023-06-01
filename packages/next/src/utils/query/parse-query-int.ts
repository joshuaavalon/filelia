import isNil from "#utils/is-nil";

interface ParseQueryIntOptions {
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  default: number;
  /**
   * Use first item. Default `false`
   */
  first?: boolean;
}

function parse(query: string, opts: ParseQueryIntOptions): number {
  const { lt, lte, gt, gte, default: defaultValue } = opts;
  try {
    const num = parseInt(query);
    if (isNaN(num)) {
      return defaultValue;
    }
    if (!isNil(lt) && num >= lt) {
      return defaultValue;
    }
    if (!isNil(lte) && num > lte) {
      return defaultValue;
    }
    if (!isNil(gt) && num <= gt) {
      return defaultValue;
    }
    if (!isNil(gte) && num < gte) {
      return defaultValue;
    }
    return num;
  } catch {
    return defaultValue;
  }
}

export default function parseQueryInt(
  query: string | string[] | undefined,
  opts: ParseQueryIntOptions
): number {
  const { default: defaultValue, first } = opts;
  if (!query) {
    return defaultValue;
  }
  let item: string;
  if (Array.isArray(query)) {
    if (query.length <= 0) {
      return defaultValue;
    }
    item = first ? query[0] : query[query.length - 1];
  } else {
    item = query;
  }
  return parse(item, opts);
}
