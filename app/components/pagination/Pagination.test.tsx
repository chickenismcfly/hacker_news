import { Pagination } from "./Pagination";
import { renderWithChakra, screen } from "@/utils/test";

jest.mock("./PaginationSkeleton", () => ({
  PaginationSkeleton: () => <div data-testid="pagination-skeleton" />,
}));

describe("Pagination", () => {
  it("renders skeleton when loading is true", () => {
    renderWithChakra(<Pagination loading />);
    expect(screen.getByTestId("pagination-skeleton")).toBeInTheDocument();
  });

  it("renders pagination controls when loading is false", () => {
    renderWithChakra(
      <Pagination loading={false} count={3} page={1} onChange={() => {}} />,
    );
    expect(
      screen.getByTestId("pagination-previous-button"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("pagination-next-button")).toBeInTheDocument();
  });

  it("renders page items correctly", () => {
    renderWithChakra(
      <Pagination
        loading={false}
        count={30}
        page={1}
        pageSize={10}
        onPageChange={() => {}}
      />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
