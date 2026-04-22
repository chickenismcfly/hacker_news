import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchStoryIds } from "@/app/api/api";

export function useNewStories(): UseQueryResult<number[], Error> {
  return useQuery<number[], Error>({
    queryKey: ["newStories"],
    queryFn: () => fetchStoryIds("new"),
    staleTime: 1000 * 60 * 5,
  });
}
