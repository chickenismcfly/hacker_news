import { FunctionComponent } from "react";
import { useTopStories } from "@/app/top-stories/use-top-stories";
import { StoryFeedPage } from "@/app/components/story-feed-page";

const TopStoriesPage: FunctionComponent = () => {
  const { data: ids, isLoading: loadingIds } = useTopStories();

  return (
    <StoryFeedPage title="Top Stories" ids={ids} loadingIds={loadingIds} />
  );
};

export default TopStoriesPage;
