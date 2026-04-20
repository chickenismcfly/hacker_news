import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export const PaginationSkeleton = () => {
  return (
    <div className="flex items-center gap-1">
      <button
        disabled
        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 cursor-not-allowed"
      >
        <LuChevronLeft size={16} />
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
      <button
        disabled
        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 cursor-not-allowed"
      >
        <LuChevronRight size={16} />
      </button>
    </div>
  );
};
