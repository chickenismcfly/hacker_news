import { FunctionComponent } from "react";
import { useTopStories } from "@/app/top-stories/useTopStories";
import { StoryFeedPage } from "@/app/components/StoryFeedPage";

const TopStoriesPage: FunctionComponent = () => {
  const { data: ids, isLoading: loadingIds } = useTopStories();

  return (
    <StoryFeedPage
      title="Top Stories"
      ids={ids}
      loadingIds={loadingIds}
    />
  );
};

export default TopStoriesPage;
