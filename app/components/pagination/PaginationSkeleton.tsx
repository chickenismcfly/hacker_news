import { ButtonGroup, HStack, IconButton, Skeleton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export const PaginationSkeleton = () => {
  return (
    <ButtonGroup variant="ghost" size="sm" attached>
      <IconButton aria-label="Previous page" disabled>
        <LuChevronLeft />
      </IconButton>

      <HStack gap={1}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} height="32px" width="32px" borderRadius="md" />
        ))}
      </HStack>

      <IconButton aria-label="Next page" disabled>
        <LuChevronRight />
      </IconButton>
    </ButtonGroup>
  );
};
