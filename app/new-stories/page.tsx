import { FunctionComponent } from "react";
import { useNewStories } from "@/app/new-stories/use-new-stories";
import { StoryFeedPage } from "@/app/components/story-feed-page";

const NewStoriesPage: FunctionComponent = () => {
  const { data: ids, isLoading: loadingIds } = useNewStories();

  return (
    <StoryFeedPage title="New Stories" ids={ids} loadingIds={loadingIds} />
  );
};

export default NewStoriesPage;
