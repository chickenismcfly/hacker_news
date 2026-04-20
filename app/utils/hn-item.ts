import { HNItem } from "@/app/api/types";

export const isVisibleComment = (item: HNItem): boolean =>
  !item.deleted && !item.dead;