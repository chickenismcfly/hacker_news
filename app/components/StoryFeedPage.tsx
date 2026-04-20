import { useItemsBatch } from "@/app/api/useItemsBatch";
import { usePagination } from "@/app/components/pagination/usePagination";
import { useMemo, useState } from "react";
import { paginateData } from "@/app/components/pagination/paginateData";
import { HNItem } from "@/app/api/types";
import { Pagination } from "@/app/components/pagination/Pagination";
import { AnimatedGrid } from "@/app/components/AnimatedGrid";
import { Card, CardBaseProps, CardProps } from "@/app/components/card/Card";
import { CommentsDrawer } from "@/app/components/comments/CommentsDrawer";

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
  const [selectedStory, setSelectedStory] = useState<HNItem | null>(null);
  const { currentPage, pageSize, setCurrentPage } = usePagination({
    pageSize: 9,
  });

  const pageIds = useMemo(
    () => paginateData<number>(ids ?? [], currentPage, pageSize),
    [ids, currentPage, pageSize],
  );

  const { data: stories = [], isLoading: loadingStories } = useItemsBatch(pageIds);

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

  return (
    <>
    <CommentsDrawer
      story={selectedStory}
      onClose={() => setSelectedStory(null)}
    />
    <div className="py-9 min-h-screen overflow-hidden">
      <div className="flex justify-between items-start mb-8 gap-4">
        <h1 className="text-4xl font-bold text-lilac-950 tracking-tight">
          {title}
        </h1>
        <Pagination
          count={ids?.length ?? 0}
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
    </>
  );
};
