import { useItemsBatch } from "@/app/api/useItemsBatch";
import { usePagination } from "@/app/components/pagination/usePagination";
import { FunctionComponent, useMemo } from "react";
import { paginateData } from "@/app/components/pagination/paginateData";
import { HNItem } from "@/app/api/types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Pagination } from "@/app/components/pagination/Pagination";
import { AnimatedGrid } from "@/app/components/AnimatedGrid";
import { Card } from "@/app/components/card/Card";

export type StoryFeedPageProps = {
  title: string;
  ids: number[];
  loadingIds: boolean;
};

/*
 * I assumed from the task description that I have to handle paging
 * the entire batch of data without using an API with built-in paging
 */
export const StoryFeedPage: FunctionComponent<StoryFeedPageProps> = ({
  title,
  ids,
  loadingIds,
}) => {
  const { data: stories, isLoading: loadingStories } = useItemsBatch(ids ?? []);
  const { currentPage, pageSize, setCurrentPage } = usePagination({
    pageSize: 9,
  });
  const paginatedData = useMemo(
    () => paginateData<HNItem>(stories as HNItem[], currentPage, pageSize),
    [currentPage, pageSize, stories],
  );

  const loading = loadingIds || loadingStories;

  const itemsToRender = loading
    ? Array.from({ length: 9 }).map(() => ({ loading: true }))
    : paginatedData.map((item) => ({
        loading: false,
        item: {
          ...item,
          pointsCount: item.score,
          commentsCount: item.descendants,
        },
      }));

  return (
    <Box textAlign="left" py={9} minHeight="100vh" overflow="hidden">
      <Flex justifyContent="space-between">
        <Heading size="3xl" pb={9}>
          {title}
        </Heading>
        <Pagination
          count={stories?.length as number}
          pageSize={pageSize}
          page={currentPage}
          onPageChange={(e) => setCurrentPage(e.page)}
          loading={loading}
        />
      </Flex>
      <AnimatedGrid motionKey={currentPage}>
        {itemsToRender?.map((story, index) => (
          <Card key={index} {...story} />
        ))}
      </AnimatedGrid>
    </Box>
  );
};
