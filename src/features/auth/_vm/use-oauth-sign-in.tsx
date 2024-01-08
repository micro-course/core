import { useMutation } from "@tanstack/react-query";
import { ClientSafeProvider, signIn } from "next-auth/react";

export function useOAuthSignIn(provider: ClientSafeProvider) {
  const oauthSignInMutation = useMutation({
    mutationFn: () => signIn(provider.id),
  });

  return {
    isPending: oauthSignInMutation.isPending,
    signIn: oauthSignInMutation.mutate,
  };
}
