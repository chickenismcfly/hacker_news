type CommentSkeletonProps = {
  compact?: boolean;
};

export const CommentSkeleton = ({ compact }: CommentSkeletonProps) => {
  return (
    <div className="border-l-2 border-lilac-100 pl-3 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 bg-lilac-100 rounded w-20" />
        <div className="h-3 bg-lilac-100 rounded w-12" />
      </div>
      {compact ? (
        <div className="h-3 bg-lilac-100 rounded w-3/4" />
      ) : (
        <>
          <div className="h-3 bg-lilac-100 rounded w-full mb-1.5" />
          <div className="h-3 bg-lilac-100 rounded w-4/5 mb-1.5" />
          <div className="h-3 bg-lilac-100 rounded w-3/5" />
        </>
      )}
    </div>
  );
};
