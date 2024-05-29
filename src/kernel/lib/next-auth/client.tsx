"use client";
import { SharedSession } from "@/kernel/domain/user";
import { useSession } from "next-auth/react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useMemo } from "react";

export const useAppSession = useSession;
export function AppSessionProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}

export function useAbility<T>(abilityFactory: (session: SharedSession) => T) {
  const session = useAppSession();

  return useMemo(
    () =>
      session.status === "authenticated" ? abilityFactory(session.data) : null,
    [abilityFactory, session.data, session.status],
  );
}
