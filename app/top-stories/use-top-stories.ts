import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchStoryIds } from "@/app/api/api";

export function useTopStories(): UseQueryResult<number[], Error> {
  return useQuery<number[], Error>({
    queryKey: ["topStories"],
    queryFn: () => fetchStoryIds("top"),
    staleTime: 1000 * 60 * 5,
  });
}
