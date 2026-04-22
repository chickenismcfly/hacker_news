import { render, screen, fireEvent } from "@/utils/test";
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

describe("Card", () => {
  it("renders CardSkeleton when loading is true", () => {
    render(<Card loading />);
    expect(screen.getByTestId("card-skeleton")).toBeInTheDocument();
  });

  it("renders card with item data when loading is false", () => {
    render(<Card loading={false} item={mockItem} />);

    expect(screen.getByText("Example Story")).toBeInTheDocument();
    expect(screen.getByText("by Example Author")).toBeInTheDocument();
    expect(screen.getByText(/42 points/)).toBeInTheDocument();
    expect(screen.getByText("17 comments")).toBeInTheDocument();
    expect(screen.getByText("#123")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", mockItem.url);
  });

  it("calls onCommentsClick when comments button is clicked", () => {
    const onCommentsClick = vi.fn();
    render(<Card loading={false} item={mockItem} onCommentsClick={onCommentsClick} />);
    fireEvent.click(screen.getByText("17 comments"));
    expect(onCommentsClick).toHaveBeenCalledOnce();
  });
});
