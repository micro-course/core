import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function useEmailSignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const emailSignInMutation = useMutation({
    mutationFn: (email: string) =>
      signIn("email", {
        email,
        callbackUrl: callbackUrl ?? undefined,
      }),
  });

  return {
    isPending: emailSignInMutation.isPending,
    signIn: emailSignInMutation.mutate,
  };
}
