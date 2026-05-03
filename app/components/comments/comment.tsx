import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { HNItem } from "@/app/api/types";
import { useItems } from "@/app/api/use-items-batch";
import { useDisclosureA11y } from "@/app/hooks/a11y/use-disclosure-a11y";
import { CommentSkeleton } from "./comment-skeleton";
import { formatTimeAgo } from "@/app/utils/time";
import { isVisibleComment } from "@/app/utils/hn-item";

const MAX_DEPTH = 3;

const borderColors = [
  "border-primary-400",
  "border-primary-300",
  "border-primary-200",
  "border-primary-100",
];

type CommentRepliesProps = {
  kidIds: number[];
  depth: number;
  regionId: string;
};

const CommentReplies = ({ kidIds, depth, regionId }: CommentRepliesProps) => {
  const { data: replies, isLoading } = useItems(kidIds);

  if (isLoading) {
    return (
      <div id={regionId} className="mt-3 ml-4 space-y-3">
        {Array.from({ length: Math.min(kidIds.length, 3) }).map((_, i) => (
          <CommentSkeleton key={i} compact />
        ))}
      </div>
    );
  }

  return (
    <div id={regionId} className="mt-3 ml-4 space-y-3">
      {replies
        .filter(isVisibleComment)
        .map((reply) => (
          <Comment key={reply.id} item={reply} depth={depth} />
        ))}
    </div>
  );
};

type CommentProps = {
  item: HNItem;
  depth?: number;
};

export const Comment = ({ item, depth = 0 }: CommentProps) => {
  const [expanded, setExpanded] = useState(false);
  const replyCount = item.kids?.length ?? 0;
  const hasReplies = replyCount > 0 && depth < MAX_DEPTH;
  const borderColor = borderColors[Math.min(depth, borderColors.length - 1)];
  const { triggerProps, regionProps } = useDisclosureA11y(expanded);

  return (
    <div className={`border-l-2 ${borderColor} pl-3`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-xs font-semibold text-primary-700">{item.by}</span>
        <span className="text-xs text-slate-300">·</span>
        <span className="text-xs text-slate-500">{formatTimeAgo(item.time)}</span>
      </div>

      {item.text ? (
        <div
          className="text-sm text-slate-700 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-primary-600 [&_a]:underline [&_a:hover]:text-primary-800 [&_pre]:mt-2 [&_pre]:bg-primary-50 [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:text-xs [&_pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-xs"
          dangerouslySetInnerHTML={{ __html: item.text }}
        />
      ) : (
        <p className="text-sm text-slate-400 italic">[deleted]</p>
      )}

      {hasReplies && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-800 transition-colors"
          {...triggerProps}
        >
          {expanded ? <LuChevronUp size={12} /> : <LuChevronDown size={12} />}
          {expanded
            ? "Hide replies"
            : `${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
        </button>
      )}

      {hasReplies && expanded && (
        <CommentReplies
          kidIds={item.kids!}
          depth={depth + 1}
          regionId={regionProps.id}
        />
      )}
    </div>
  );
};
