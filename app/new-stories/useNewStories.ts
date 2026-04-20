import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { HACKER_NEWS_API } from "@/app/api/api";

export function useNewStories(limit?: number): UseQueryResult<number[], Error> {
  return useQuery<number[], Error>({
    queryKey: ["newStories", limit],
    queryFn: async (): Promise<number[]> => {
      const response = await fetch(`${HACKER_NEWS_API}/newstories.json`);
      if (!response.ok) throw new Error("Failed to fetch new stories");
      const ids = await response.json();
      return ids.slice(0, limit);
    },
    staleTime: 1000 * 60 * 5,
  });
}
