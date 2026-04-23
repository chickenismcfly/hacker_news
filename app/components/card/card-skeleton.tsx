export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-primary-200 shadow-sm flex flex-col animate-pulse">
      <div className="flex-[3] p-5">
        <div className="h-5 bg-primary-100 rounded w-4/5 mb-2" />
        <div className="h-5 bg-primary-100 rounded w-3/5" />
      </div>
      <div className="flex-[2] px-5 pb-4">
        <div className="h-4 bg-primary-100 rounded w-2/5 mb-3" />
        <div className="flex justify-between gap-4">
          <div className="h-4 bg-primary-100 rounded w-1/3" />
          <div className="h-4 bg-primary-100 rounded w-1/3" />
        </div>
      </div>
      <div className="flex-1 px-5 pb-5">
        <div className="h-6 bg-primary-100 rounded-full w-14" />
      </div>
    </div>
  );
};
