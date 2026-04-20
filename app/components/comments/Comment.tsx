import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { HNItem } from "@/app/api/types";
import { useItemsBatch } from "@/app/api/useItemsBatch";
import { CommentSkeleton } from "./CommentSkeleton";

const MAX_DEPTH = 3;

const borderColors = [
  "border-lilac-400",
  "border-lilac-300",
  "border-lilac-200",
  "border-lilac-100",
];

function formatTimeAgo(unixTime: number): string {
  const seconds = Math.floor(Date.now() / 1000 - unixTime);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

type CommentRepliesProps = {
  kidIds: number[];
  depth: number;
};

const CommentReplies = ({ kidIds, depth }: CommentRepliesProps) => {
  const { data: replies = [], isLoading } = useItemsBatch(kidIds);

  if (isLoading) {
    return (
      <div className="mt-3 ml-4 space-y-3">
        {Array.from({ length: Math.min(kidIds.length, 3) }).map((_, i) => (
          <CommentSkeleton key={i} compact />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3 ml-4 space-y-3">
      {replies
        .filter((r) => !r.deleted && !r.dead)
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

  return (
    <div className={`border-l-2 ${borderColor} pl-3`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-xs font-semibold text-lilac-700">{item.by}</span>
        <span className="text-xs text-slate-300">·</span>
        <span className="text-xs text-slate-500">{formatTimeAgo(item.time)}</span>
      </div>

      {item.text ? (
        <div
          className="text-sm text-slate-700 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-lilac-600 [&_a]:underline [&_a:hover]:text-lilac-800 [&_pre]:mt-2 [&_pre]:bg-lilac-50 [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:text-xs [&_pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-xs"
          dangerouslySetInnerHTML={{ __html: item.text }}
        />
      ) : (
        <p className="text-sm text-slate-400 italic">[deleted]</p>
      )}

      {hasReplies && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-lilac-600 hover:text-lilac-800 transition-colors"
        >
          {expanded ? <LuChevronUp size={12} /> : <LuChevronDown size={12} />}
          {expanded
            ? "Hide replies"
            : `${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
        </button>
      )}

      {hasReplies && expanded && (
        <CommentReplies kidIds={item.kids!} depth={depth + 1} />
      )}
    </div>
  );
};
