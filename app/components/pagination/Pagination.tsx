import {
  ButtonGroup,
  IconButton,
  Pagination as ChakraPagination,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FunctionComponent } from "react";
import { PaginationSkeleton } from "@/app/components/pagination/PaginationSkeleton";

export type PaginationProps = ChakraPagination.RootProps & {
  loading?: boolean;
};

export const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const { loading, ...rest } = props;

  if (loading) {
    return <PaginationSkeleton />;
  }

  return (
    <ChakraPagination.Root {...rest}>
      <ButtonGroup variant="ghost" size="sm">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton
            aria-label="Go to previous page"
            data-testid="pagination-previous-button"
          >
            <LuChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton
            aria-label="Go to next page"
            data-testid="pagination-next-button"
          >
            <LuChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
};
