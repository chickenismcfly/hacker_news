import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { HACKER_NEWS_API } from "@/app/api/api";

export function useTopStories(): UseQueryResult<number[], Error> {
  return useQuery<number[], Error>({
    queryKey: ["topStories"],
    queryFn: async (): Promise<number[]> => {
      const response = await fetch(`${HACKER_NEWS_API}/topstories.json`);
      if (!response.ok) throw new Error("Failed to fetch top stories");
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}
