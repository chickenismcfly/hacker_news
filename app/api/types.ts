export interface HNItem {
  id: number;
  type: "story" | "comment" | "poll" | "pollopt" | "job";
  by: string;
  time: number;
  text?: string;
  url?: string;
  score?: number;
  title?: string;
  descendants?: number;
  kids?: number[];
  parent?: number;
  deleted?: boolean;
  dead?: boolean;
}
