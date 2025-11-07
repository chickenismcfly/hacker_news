import { renderWithChakra, screen } from "@/utils/test";
import { Card } from "./Card";

jest.mock("./CardSkeleton", () => ({
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
    renderWithChakra(<Card loading />);
    expect(screen.getByTestId("card-skeleton")).toBeInTheDocument();
  });

  it("renders card with item data when loading is false", () => {
    renderWithChakra(<Card loading={false} item={mockItem} />);

    expect(screen.getByText("Example Story")).toBeInTheDocument();
    expect(screen.getByText("by Example Author")).toBeInTheDocument();
    expect(screen.getByText("42 points")).toBeInTheDocument();
    expect(screen.getAllByText("17 comments")).toHaveLength(1);
    expect(screen.getByText("#123")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", mockItem.url);
  });
});
