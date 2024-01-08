import { useRevalidateSession } from "@/entities/session/queries.client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();
  const revalidateSession = useRevalidateSession();
  const mutation = useMutation({
    mutationFn: () => signOut({ callbackUrl: "/" }),
    onSuccess: async () => {
      revalidateSession();
      router.push("/auth/sign-in");
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
