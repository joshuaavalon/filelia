import { useCallback, useEffect, useState } from "react";

export function useResizing(delay = 500): boolean {
  const [resizing, setResizing] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const onResize = useCallback(
    (_e: UIEvent) => {
      setResizing(true);
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          setResizing(false);
        }, delay)
      );
    },
    [delay, timer]
  );
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
  return resizing;
}
