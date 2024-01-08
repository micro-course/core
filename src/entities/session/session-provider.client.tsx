"use client";
import { useQuery } from "@tanstack/react-query";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { getSessionQuery } from "./_queries";

export function AppSessionProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
