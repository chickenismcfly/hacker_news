import { useCallback, useRef } from "react";
import { HNItem } from "@/app/api/types";
import { useItems } from "@/app/api/use-items-batch";
import { isVisibleComment } from "@/app/utils/hn-item";
import { useEscapeKey } from "@/app/hooks/a11y/use-escape-key";
import { useRestoreFocus } from "@/app/hooks/a11y/use-restore-focus";
import { useInitialFocus } from "@/app/hooks/a11y/use-initial-focus";
import { useScrollLock } from "@/app/hooks/a11y/use-scroll-lock";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useCommentsDrawer(story: HNItem | null, onClose: () => void) {
  const { data: comments, isLoading } = useItems(story?.kids ?? []);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isOpen = !!story;

  useRestoreFocus(isOpen);
  useInitialFocus(isOpen, closeButtonRef);

  useEscapeKey(onClose, isOpen);
  useScrollLock(isOpen);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );

    if (!focusableElements?.length) {
      event.preventDefault();
      closeButtonRef.current?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, []);

  return {
    visibleComments: comments.filter(isVisibleComment),
    isLoading,
    closeButtonRef,
    drawerRef,
    onKeyDown,
  };
}
