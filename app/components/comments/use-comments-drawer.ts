import { HNItem } from "@/app/api/types";
import { useItemsBatch } from "@/app/api/use-items-batch";
import { isVisibleComment } from "@/app/utils/hn-item";
import { useEscapeKey } from "@/app/hooks/use-escape-key";
import { useScrollLock } from "@/app/hooks/use-scroll-lock";

export function useCommentsDrawer(story: HNItem | null, onClose: () => void) {
  const { data: comments = [], isLoading } = useItemsBatch(story?.kids ?? []);

  useEscapeKey(onClose);
  useScrollLock(!!story);

  return {
    visibleComments: comments.filter(isVisibleComment),
    isLoading,
  };
}
