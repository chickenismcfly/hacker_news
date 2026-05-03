import { useRef } from "react";
import { HNItem } from "@/app/api/types";
import { useItems } from "@/app/api/use-items-batch";
import { isVisibleComment } from "@/app/utils/hn-item";
import { useEscapeKey } from "@/app/hooks/a11y/use-escape-key";
import { useFocusTrap } from "@/app/hooks/a11y/use-focus-trap";
import { useRestoreFocus } from "@/app/hooks/a11y/use-restore-focus";
import { useInitialFocus } from "@/app/hooks/a11y/use-initial-focus";
import { useScrollLock } from "@/app/hooks/a11y/use-scroll-lock";

export function useCommentsDrawer(story: HNItem | null, onClose: () => void) {
  const { data: comments, isLoading } = useItems(story?.kids ?? []);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isOpen = !!story;

  useRestoreFocus(isOpen);
  useInitialFocus(isOpen, closeButtonRef);

  useEscapeKey(onClose, isOpen);
  useScrollLock(isOpen);
  const onKeyDown = useFocusTrap(isOpen, drawerRef, closeButtonRef);

  return {
    visibleComments: comments.filter(isVisibleComment),
    isLoading,
    closeButtonRef,
    drawerRef,
    onKeyDown,
  };
}
