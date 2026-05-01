import { RefObject, useEffect } from "react";

export function useInitialFocus<T extends HTMLElement>(
  active: boolean,
  ref: RefObject<T | null>,
) {
  useEffect(() => {
    if (!active) return;
    ref.current?.focus();
  }, [active, ref]);
}

