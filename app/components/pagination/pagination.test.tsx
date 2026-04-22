import { Pagination } from "./pagination";
import { render, screen, fireEvent } from "@/utils/test";

vi.mock("./pagination-skeleton", () => ({
  PaginationSkeleton: () => <div data-testid="pagination-skeleton" />,
}));

describe("Pagination", () => {
  it("renders skeleton when loading is true", () => {
    render(<Pagination loading />);
    expect(screen.getByTestId("pagination-skeleton")).toBeInTheDocument();
  });

  it("renders previous and next buttons", () => {
    render(
      <Pagination loading={false} count={30} pageSize={10} page={2} onPageChange={() => {}} />,
    );
    expect(screen.getByTestId("pagination-previous-button")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-next-button")).toBeInTheDocument();
  });

  it("renders page numbers", () => {
    render(
      <Pagination loading={false} count={30} page={1} pageSize={10} onPageChange={() => {}} />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination loading={false} count={30} pageSize={10} page={1} onPageChange={() => {}} />,
    );
    expect(screen.getByTestId("pagination-previous-button")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination loading={false} count={30} pageSize={10} page={3} onPageChange={() => {}} />,
    );
    expect(screen.getByTestId("pagination-next-button")).toBeDisabled();
  });

  it("calls onPageChange with next page when next is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination loading={false} count={30} pageSize={10} page={1} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByTestId("pagination-next-button"));
    expect(onPageChange).toHaveBeenCalledWith({ page: 2 });
  });

  it("calls onPageChange with previous page when previous is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination loading={false} count={30} pageSize={10} page={2} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByTestId("pagination-previous-button"));
    expect(onPageChange).toHaveBeenCalledWith({ page: 1 });
  });

  it("calls onPageChange with the correct page when a page number is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination loading={false} count={30} pageSize={10} page={1} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith({ page: 3 });
  });

  it("renders ellipsis for large page counts", () => {
    render(
      <Pagination loading={false} count={100} pageSize={10} page={5} onPageChange={() => {}} />,
    );
    expect(screen.getAllByText("…")).toHaveLength(2);
  });
});
