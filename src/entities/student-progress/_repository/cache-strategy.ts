import {
  CacheStrategy,
  InvalidateonStrategy,
  UpdateCacheStrategy,
} from "@/shared/lib/cache";
import { QueryClient } from "@tanstack/react-query";

export class ReactQueryCacheStrategy
  implements CacheStrategy, InvalidateonStrategy, UpdateCacheStrategy
{
  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          gcTime: 10 * 60 * 1000,
          staleTime: 10 * 60 * 1000,
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

  update(key: unknown[], data: unknown) {
    return this.queryClient.setQueryData(key, data);
  }

  invalidate(key: unknown[]) {
    return this.queryClient.refetchQueries({
      queryKey: key,
    });
  }
}

export const studentProgressCacheStrategy = new ReactQueryCacheStrategy();
