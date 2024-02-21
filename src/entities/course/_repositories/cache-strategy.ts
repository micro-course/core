import { publicConfig } from "@/shared/config/public";
import { CacheStrategy } from "@/shared/lib/cache";
import { QueryClient } from "@tanstack/react-query";

export class DummyCacheStrategy implements CacheStrategy {
  fetch<T>(_: unknown[], getData: () => Promise<T>): Promise<T> {
    return getData();
  }
}

export class CourseIndexCacheStrategy implements CacheStrategy {
  private timer: any;

  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          gcTime: Infinity,
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

export class CompiledContentCacheStrategy implements CacheStrategy {
  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: publicConfig.isDev ? 0 : 5 * 60 * 1000,
          gcTime: 5 * 60 * 1000,
          retry: 0,
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
}

export const contentCacheStrategy = new CourseIndexCacheStrategy();

export const compiledContentCacheStrategy = new CompiledContentCacheStrategy();

/*
export const contentCacheStrategy = publicConfig.isDev
  ? new DummyCacheStrategy()
  : new CourseIndexCacheStrategy();

export const compiledContentCacheStrategy = publicConfig.isDev
  ? new DummyCacheStrategy()
  : new CompiledContentCacheStrategy();
*/
