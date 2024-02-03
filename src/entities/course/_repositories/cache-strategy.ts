import { publicConfig } from "@/shared/config/public";
import { CacheStrategy } from "@/shared/lib/cache";
import { QueryClient } from "@tanstack/react-query";

export class DummyCacheStrategy implements CacheStrategy {
  fetch<T>(_: unknown[], getData: () => Promise<T>): Promise<T> {
    return getData();
  }
}

export class ReactQueryCacheStrategy implements CacheStrategy {
  private timer: any;

  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          retry: 0,
        },
      },
    }),
  ) {
    this.timer = setInterval(
      () => {
        queryClient.refetchQueries();
      },
      60 * 60 * 1000,
    );
  }

  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T> {
    return this.queryClient.fetchQuery({
      queryKey: key,
      queryFn: getData,
    });
  }

  stopRefetching() {
    clearInterval(this.timer);
  }
}

export const contentCacheStrategy = publicConfig.isDev
  ? new DummyCacheStrategy()
  : new ReactQueryCacheStrategy();
