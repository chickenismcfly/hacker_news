import { useItemsBatch } from "@/app/api/useItemsBatch";
import { usePagination } from "@/app/components/pagination/usePagination";
import { useMemo } from "react";
import { paginateData } from "@/app/components/pagination/paginateData";
import { HNItem } from "@/app/api/types";
import { Pagination } from "@/app/components/pagination/Pagination";
import { AnimatedGrid } from "@/app/components/AnimatedGrid";
import { Card, CardBaseProps, CardProps } from "@/app/components/card/Card";

export type StoryFeedPageProps = {
  title: string;
  ids?: number[];
  loadingIds: boolean;
};

export const StoryFeedPage = ({
  title,
  ids,
  loadingIds,
}: StoryFeedPageProps) => {
  const { data: stories = [], isLoading: loadingStories } = useItemsBatch(ids);
  const { currentPage, pageSize, setCurrentPage } = usePagination({
    pageSize: 9,
  });

  const loading = loadingIds || loadingStories;

  const paginatedData = useMemo(() => {
    if (loading) return [];
    return paginateData<HNItem>(stories, currentPage, pageSize);
  }, [currentPage, pageSize, stories, loading]);

  const itemsToRender: CardProps<CardBaseProps>[] = loading
    ? Array.from({ length: pageSize }).map(() => ({ loading: true }))
    : paginatedData.map((item) => ({
        loading: false,
        item: {
          ...item,
          pointsCount: item.score,
          commentsCount: item.descendants,
        },
      }));

  return (
    <div className="py-9 min-h-screen overflow-hidden">
      <div className="flex justify-between items-start mb-8 gap-4">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        <Pagination
          count={stories.length}
          pageSize={pageSize}
          page={currentPage}
          onPageChange={(e) => setCurrentPage(e.page)}
          loading={loading}
        />
      </div>

      <AnimatedGrid motionKey={currentPage}>
        {itemsToRender.map((story, index) => (
          <Card
            key={story.loading ? `skeleton-${index}` : story.item.id}
            {...story}
          />
        ))}
      </AnimatedGrid>
    </div>
  );
};
