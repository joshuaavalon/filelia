export default function filterPredicate(
  filter: string,
  caseSensitive: boolean
): (value: string) => boolean {
  return value => {
    let casedTag = caseSensitive ? value : value.toLowerCase();
    const casedFilter = caseSensitive ? filter : filter.toLowerCase();
    for (const char of casedFilter) {
      if (!char.trim()) {
        continue;
      }
      const index = casedTag.indexOf(char);
      if (index < 0) {
        return false;
      }
      casedTag = casedTag.slice(index + 1);
    }
    return true;
  };
}
