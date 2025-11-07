"use client";

import { FunctionComponent } from "react";
import { useNewStories } from "@/app/new-stories/useNewStories";
import { StoryFeedPage } from "@/app/components/StoryFeedPage";

const NewStoriesPage: FunctionComponent = () => {
  const { data: ids, isLoading: loadingIds } = useNewStories();

  return (
    <StoryFeedPage
      title="New Stories"
      ids={ids as number[]}
      loadingIds={loadingIds}
    />
  );
};

export default NewStoriesPage;
