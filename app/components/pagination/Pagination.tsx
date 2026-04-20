import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FunctionComponent } from "react";
import { PaginationSkeleton } from "@/app/components/pagination/PaginationSkeleton";

export type PaginationProps = {
  count: number;
  pageSize: number;
  page: number;
  onPageChange: (e: { page: number }) => void;
  loading?: boolean;
};

export const Pagination: FunctionComponent<PaginationProps> = ({
  count,
  pageSize,
  page,
  onPageChange,
  loading,
}) => {
  if (loading) return <PaginationSkeleton />;

  const totalPages = Math.ceil(count / pageSize);

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [1];
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  };

  const btnBase =
    "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-150";
  const btnActive = "bg-hn-orange text-white";
  const btnInactive =
    "text-slate-600 hover:bg-slate-200";
  const btnDisabled = "text-slate-300 cursor-not-allowed";

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange({ page: page - 1 })}
        disabled={page <= 1}
        data-testid="pagination-previous-button"
        aria-label="Go to previous page"
        className={`${btnBase} ${page <= 1 ? btnDisabled : btnInactive}`}
      >
        <LuChevronLeft size={16} />
      </button>

      {getPageNumbers().map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange({ page: p })}
            className={`${btnBase} ${p === page ? btnActive : btnInactive}`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange({ page: page + 1 })}
        disabled={page >= totalPages}
        data-testid="pagination-next-button"
        aria-label="Go to next page"
        className={`${btnBase} ${page >= totalPages ? btnDisabled : btnInactive}`}
      >
        <LuChevronRight size={16} />
      </button>
    </div>
  );
};
