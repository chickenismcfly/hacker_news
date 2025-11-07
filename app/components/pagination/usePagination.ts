import { useState } from "react";

export function usePagination({ initialPage = 1, pageSize = 10 }) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return {
    currentPage,
    pageSize,
    setCurrentPage,
  };
}
