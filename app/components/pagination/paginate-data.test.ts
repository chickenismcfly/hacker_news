import { paginateData } from "./paginate-data";

describe("paginateData", () => {
  const sampleData = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);

  it("returns the correct slice for page 1", () => {
    const result = paginateData(sampleData, 1, 10);
    expect(result).toHaveLength(10);
    expect(result[0]).toBe("Item 1");
    expect(result[9]).toBe("Item 10");
  });

  it("returns the correct slice for page 2", () => {
    const result = paginateData(sampleData, 2, 10);
    expect(result).toHaveLength(10);
    expect(result[0]).toBe("Item 11");
    expect(result[9]).toBe("Item 20");
  });

  it("returns remaining items for last page", () => {
    const result = paginateData(sampleData, 3, 10);
    expect(result).toEqual(["Item 21", "Item 22", "Item 23", "Item 24", "Item 25"]);
  });

  it("returns empty array if page is out of bounds", () => {
    const result = paginateData(sampleData, 4, 10);
    expect(result).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    const result = paginateData([], 1, 10);
    expect(result).toEqual([]);
  });
});