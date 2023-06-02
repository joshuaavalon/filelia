interface Options {
  default: string;
  /**
   * Use first item. Default `false`
   */
  first?: boolean;
}

export default function parseQueryString(
  query: string | string[] | undefined,
  opts: Options
): string {
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
  return item;
}
