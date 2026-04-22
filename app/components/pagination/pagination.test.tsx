import { Pagination } from "./pagination";
import { render, screen } from "@/utils/test";

vi.mock("./pagination-skeleton", () => ({
  PaginationSkeleton: () => <div data-testid="pagination-skeleton" />,
}));

describe("Pagination", () => {
  it("renders skeleton when loading is true", () => {
    render(<Pagination loading />);
    expect(screen.getByTestId("pagination-skeleton")).toBeInTheDocument();
  });

  it("renders pagination controls when loading is false", () => {
    render(
      <Pagination loading={false} count={3} pageSize={1} page={1} onPageChange={() => {}} />,
    );
    expect(
      screen.getByTestId("pagination-previous-button"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("pagination-next-button")).toBeInTheDocument();
  });

  it("renders page items correctly", () => {
    render(
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
