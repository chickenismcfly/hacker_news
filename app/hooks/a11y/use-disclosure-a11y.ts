import { useId } from "react";

export function useDisclosureA11y(expanded: boolean) {
  const regionId = useId();

  return {
    triggerProps: {
      "aria-expanded": expanded,
      "aria-controls": regionId,
    },
    regionProps: {
      id: regionId,
    },
  };
}
