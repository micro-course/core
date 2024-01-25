import { QueryClient } from "@tanstack/react-query";

export class CacheStrategy {
  private intervalKey: any;

  constructor(
    private queryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: Infinity } },
    }),
  ) {
    this.intervalKey = setInterval(
      () => {
        queryClient.refetchQueries();
      },
      process.env.NODE_ENV === "development" ? 60 * 1000 : 60 * 60 * 1000,
    );
  }

  fetch<T>(key: unknown[], fetcher: () => Promise<T>) {
    return this.queryClient.fetchQuery({
      queryKey: key,
      queryFn: fetcher,
    });
  }

  stopRefetching() {
    clearInterval(this.intervalKey);
  }
}
