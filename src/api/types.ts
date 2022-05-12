type SearchQueryParams<T> = {
  order: string;
  capacity: number;
  page: number;
  searchParams: T;
};

export { SearchQueryParams };
