import { CacheStrategy, InvalidateonStrategy } from "@/shared/lib/cache";
import { QueryClient } from "@tanstack/react-query";

export class ReactQueryCacheStrategy
  implements CacheStrategy, InvalidateonStrategy
{
  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          staleTime: 60 * 60 * 1000,
        },
      },
    }),
  ) {}

  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T> {
    return this.queryClient.fetchQuery({
      queryKey: key,
      queryFn: getData,
    });
  }

  invalidate(key: unknown[]) {
    return this.queryClient.refetchQueries({
      queryKey: key,
    });
  }
}

export const mapNodesCacheStrategy = new ReactQueryCacheStrategy();
