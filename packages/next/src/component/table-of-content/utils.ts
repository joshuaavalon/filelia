export function getActiveElement(rects: DOMRect[]): number {
  if (rects.length === 0) {
    return -1;
  }

  const closest = rects.reduce(
    (acc, item, index) => {
      if (Math.abs(acc.position) < Math.abs(item.y)) {
        return acc;
      }

      return {
        index,
        position: item.y
      };
    },
    { index: 0, position: rects[0].y }
  );

  return closest.index;
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  if (value === null || value === undefined) {
    return false;
  }
  return true;
}
