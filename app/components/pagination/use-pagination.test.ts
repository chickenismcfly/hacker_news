import { usePagination } from "./use-pagination";
import { act, renderHook } from "@/utils/test";

describe("usePagination", () => {
  it("returns default values when no params are provided", () => {
    const { result } = renderHook(() => usePagination({}));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
  });

  it("respects custom initialPage and pageSize", () => {
    const { result } = renderHook(() =>
      usePagination({ initialPage: 5, pageSize: 20 }),
    );

    expect(result.current.currentPage).toBe(5);
    expect(result.current.pageSize).toBe(20);
  });

  it("updates currentPage when setCurrentPage is called", () => {
    const { result } = renderHook(() => usePagination({ initialPage: 2 }));

    act(() => {
      result.current.setCurrentPage(7);
    });

    expect(result.current.currentPage).toBe(7);
  });
});
