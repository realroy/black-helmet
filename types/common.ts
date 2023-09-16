export type PaginationQueries = {
  page?: number;
  limit?: number;
  sortBy?: `${string}-${"ASC" | "DESC"}`;
};

export type PageProps<
  TParams = {},
  TSearchParams = { [key: string]: string | string[] | undefined }
> = {
  params: TParams;
  searchParams: TSearchParams;
};
