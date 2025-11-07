export function paginateData<T>(
  data: T[],
  currentPage: number,
  pageSize: number,
): T[] {
  const start = (currentPage - 1) * pageSize;
  return data?.slice(start, start + pageSize);
}
