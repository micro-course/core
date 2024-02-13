import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export function useSignOut() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => signOut({ callbackUrl: "/" }),
    onSuccess: async () => {
      queryClient.clear();
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
