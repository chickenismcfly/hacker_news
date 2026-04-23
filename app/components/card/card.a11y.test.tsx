import { render } from "@/utils/test";
import { axe } from "@/utils/test/a11y";
import { Card } from "./card";

vi.mock("./card-skeleton", () => ({
  CardSkeleton: () => <div data-testid="card-skeleton" />,
}));

const mockItem = {
  id: 123,
  url: "https://example.com/story",
  title: "Example Story",
  by: "Example Author",
  pointsCount: 42,
  commentsCount: 17,
};

describe("Card accessibility", () => {
  it("has no violations when loading", async () => {
    const { container } = render(<Card loading />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with item data", async () => {
    const { container } = render(<Card loading={false} item={mockItem} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
