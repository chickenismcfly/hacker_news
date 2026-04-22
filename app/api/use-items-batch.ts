import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { HNItem } from "@/app/api/types";
import { fetchItem, itemQueryKey } from "@/app/api/api";

type UseItemsResult = {
  data: HNItem[];
  isLoading: boolean;
  error: Error | null;
};

export function useItems(ids: number[] = []): UseItemsResult {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: itemQueryKey(id),
      queryFn: () => fetchItem(id),
      staleTime: 1000 * 60 * 5,
    })),
  });

  return useMemo(() => {
    const isLoading = queries.some((query) => query.isPending);
    const error = queries.find((query) => query.error)?.error ?? null;
    const data = queries
      .map((query) => query.data)
      .filter((item): item is HNItem => item !== undefined);

    return {
      data,
      isLoading,
      error,
    };
  }, [queries]);
}
