import { Pagination } from "@/app/components/pagination/pagination";
import { AnimatedGrid } from "@/app/components/animated-grid";
import { Card } from "@/app/components/card/card";
import { CommentsDrawer } from "@/app/components/comments/comments-drawer";
import { useStoryFeed } from "./use-story-feed";

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
  const {
    itemsToRender,
    loading,
    currentPage,
    pageSize,
    setCurrentPage,
    selectedStory,
    setSelectedStory,
  } = useStoryFeed(ids, loadingIds);

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
