import { useEffect, useState } from "react";

export function useFirstRender(): boolean {
  const [first, setFirst] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFirst(false);
    }, 100);
  }, []);
  return first;
}
