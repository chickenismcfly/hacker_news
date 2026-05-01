import { useEffect, useRef } from "react";

export function useRestoreFocus(active = true) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      return;
    }

    const el = previousFocusRef.current;
    if (el && typeof el.focus === "function") {
      el.focus();
    }
    previousFocusRef.current = null;
  }, [active]);
}

