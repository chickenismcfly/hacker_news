import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { HACKER_NEWS_API } from "@/app/api/api";

export function useNewStories(): UseQueryResult<number[], Error> {
  return useQuery<number[], Error>({
    queryKey: ["newStories"],
    queryFn: async (): Promise<number[]> => {
      const response = await fetch(`${HACKER_NEWS_API}/newstories.json`);
      if (!response.ok) throw new Error("Failed to fetch new stories");
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}
