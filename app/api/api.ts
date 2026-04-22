import { HNItem } from "@/app/api/types";

export const HACKER_NEWS_API = "https://hacker-news.firebaseio.com/v0";

async function fetchHNResource<T>(path: string, errorMessage: string): Promise<T> {
  const response = await fetch(`${HACKER_NEWS_API}${path}`);
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export function fetchStoryIds(feed: "top" | "new"): Promise<number[]> {
  const path = feed === "top" ? "/topstories.json" : "/newstories.json";
  return fetchHNResource<number[]>(path, `Failed to fetch ${feed} stories`);
}

export function fetchItem(id: number): Promise<HNItem> {
  return fetchHNResource<HNItem>(`/item/${id}.json`, `Failed to fetch item ${id}`);
}

export function itemQueryKey(id: number) {
  return ["item", id] as const;
}
