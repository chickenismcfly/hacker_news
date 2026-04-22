import { useMemo, useState } from "react";
import { HNItem } from "@/app/api/types";
import { useItems } from "@/app/api/use-items-batch";
import { usePagination } from "@/app/components/pagination/use-pagination";
import { paginateData } from "@/app/components/pagination/paginate-data";
import { CardBaseProps, CardProps } from "@/app/components/card/card";

export function useStoryFeed(ids: number[] | undefined, loadingIds: boolean) {
  const [selectedStory, setSelectedStory] = useState<HNItem | null>(null);
  const { currentPage, pageSize, setCurrentPage } = usePagination({ pageSize: 9 });

  const pageIds = useMemo(
    () => paginateData<number>(ids ?? [], currentPage, pageSize),
    [ids, currentPage, pageSize],
  );

  const { data: stories, isLoading: loadingStories } = useItems(pageIds);

  const loading = loadingIds || loadingStories;

  const itemsToRender: CardProps<CardBaseProps>[] = loading
    ? Array.from({ length: pageSize }).map(() => ({ loading: true }))
    : stories.map((item) => ({
        loading: false,
        item: {
          ...item,
          pointsCount: item.score,
          commentsCount: item.descendants,
        },
        onCommentsClick: () => setSelectedStory(item),
      }));

  return {
    itemsToRender,
    loading,
    currentPage,
    pageSize,
    setCurrentPage,
    selectedStory,
    setSelectedStory,
  };
}
