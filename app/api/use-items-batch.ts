import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { HACKER_NEWS_API } from "@/app/api/api";
import { HNItem } from "@/app/api/types";

export function useItemsBatch(ids: number[] = []): UseQueryResult<HNItem[], Error> {
  return useQuery<HNItem[], Error>({
    queryKey: ["itemsBatch", ids],
    queryFn: async () => {
      const items = await Promise.all(
        ids.map((id) =>
          fetch(`${HACKER_NEWS_API}/item/${id}.json`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch item ${id}`);
            return res.json() as Promise<HNItem>;
          }),
        ),
      );
      return items;
    },
    enabled: ids.length > 0,
  });
}
