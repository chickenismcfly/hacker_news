import { AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
import { HNItem } from "@/app/api/types";
import { MotionBox } from "@/app/components/motion-box";
import { Comment } from "./comment";
import { CommentSkeleton } from "./comment-skeleton";
import { useCommentsDrawer } from "./use-comments-drawer";

type CommentsDrawerProps = {
  story: HNItem | null;
  onClose: () => void;
};

export const CommentsDrawer = ({ story, onClose }: CommentsDrawerProps) => {
  const { visibleComments, isLoading } = useCommentsDrawer(story, onClose);

  return (
    <AnimatePresence>
      {story && (
        <>
          <MotionBox
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-lilac-950/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <MotionBox
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="comments-drawer-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-lilac-100 flex-shrink-0">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-lilac-500 uppercase tracking-wider mb-1.5">
                  Comments
                </p>
                <h2
                  id="comments-drawer-title"
                  className="text-base font-semibold text-lilac-950 leading-snug line-clamp-2"
                >
                  {story.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close comments"
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-lilac-100 hover:text-lilac-700 transition-colors mt-0.5"
              >
                <LuX size={16} />
              </button>
            </div>

            {/* Comment count bar */}
            <div className="px-6 py-2.5 border-b border-lilac-50 flex-shrink-0">
              <span className="text-xs text-slate-500">
                {story.descendants ?? 0} total comments
              </span>
            </div>

            {/* Scrollable comment list */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <CommentSkeleton key={i} />
                ))
              ) : visibleComments.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-12">
                  No comments yet.
                </p>
              ) : (
                visibleComments.map((comment) => (
                  <Comment key={comment.id} item={comment} depth={0} />
                ))
              )}
            </div>
          </MotionBox>
        </>
      )}
    </AnimatePresence>
  );
};
