import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { HACKER_NEWS_API } from "@/app/api/api";

export function useTopStories(limit?: number): UseQueryResult<number[], Error> {
  return useQuery<number[], Error>({
    queryKey: ["topStories", limit],
    queryFn: async (): Promise<number[]> => {
      const response = await fetch(`${HACKER_NEWS_API}/topstories.json`);
      if (!response.ok) throw new Error("Failed to fetch top stories");
      const ids = await response.json();
      return ids.slice(0, limit);
    },
    staleTime: 1000 * 60 * 5,
  });
}
