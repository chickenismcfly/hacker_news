import { paginateData } from "./paginateData";

describe("paginateData", () => {
  const sampleData = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);

  it("returns the correct slice for page 1", () => {
    const result = paginateData(sampleData, 1, 10);
    expect(result).toEqual([
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
      "Item 7",
      "Item 8",
      "Item 9",
      "Item 10",
    ]);
  });

  it("returns the correct slice for page 2", () => {
    const result = paginateData(sampleData, 2, 10);
    expect(result).toEqual([
      "Item 11",
      "Item 12",
      "Item 13",
      "Item 14",
      "Item 15",
      "Item 16",
      "Item 17",
      "Item 18",
      "Item 19",
      "Item 20",
    ]);
  });

  it("returns remaining items for last page", () => {
    const result = paginateData(sampleData, 3, 10);
    expect(result).toEqual([
      "Item 21",
      "Item 22",
      "Item 23",
      "Item 24",
      "Item 25",
    ]);
  });

  it("returns empty array if page is out of bounds", () => {
    const result = paginateData(sampleData, 4, 10);
    expect(result).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    const result = paginateData([], 1, 10);
    expect(result).toEqual([]);
  });

  it("works with objects and preserves type", () => {
    type Article = { id: number; title: string };
    const articles: Article[] = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Article ${i + 1}`,
    }));

    const result = paginateData<Article>(articles, 1, 2);
    expect(result).toEqual([
      { id: 1, title: "Article 1" },
      { id: 2, title: "Article 2" },
    ]);
  });
});
