import { render } from "@/utils/test";
import { axe } from "@/utils/test/a11y";
import { Pagination } from "./pagination";

vi.mock("./pagination-skeleton", () => ({
  PaginationSkeleton: () => <div data-testid="pagination-skeleton" />,
}));

describe("Pagination accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(
      <Pagination
        loading={false}
        count={30}
        pageSize={10}
        page={2}
        onPageChange={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
