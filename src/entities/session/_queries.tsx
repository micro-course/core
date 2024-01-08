import { getSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

const sessionKey = "session";

export const getSessionQuery = () => ({
  queryKey: [sessionKey, "get"],
  queryFn: () => getSession(),
  staleTime: 5 * 60 * 1000,
});

export const useRevalidateSession = () => {
  const queryClient = useQueryClient();

  return () => queryClient.removeQueries();
};
