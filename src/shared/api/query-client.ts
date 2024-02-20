import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 3 * 24 * 60 * 60 * 1000,
    },
  },
});
