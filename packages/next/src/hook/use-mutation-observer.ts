import { useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true }
};

export default function useMutationObservable(
  target: Node | null,
  callback: MutationCallback,
  options = DEFAULT_OPTIONS
): void {
  const [observer, setObserver] = useState<MutationObserver>();

  useEffect(() => {
    const obs = new MutationObserver(callback);
    setObserver(obs);
  }, [callback, options, setObserver]);

  useEffect(() => {
    if (!observer || !target) {
      return undefined;
    }
    const { config } = options;
    observer.observe(target, config);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, target, options]);
}
