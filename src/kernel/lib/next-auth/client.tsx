"use client";
import { useSession } from "next-auth/react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export const useAppSession = useSession;
export function AppSessionProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
