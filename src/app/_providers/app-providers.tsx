"use client";

import { AppSessionProvider } from "@/entities/session/session-provider.client";
import { queryClient } from "@/shared/lib/query-client";
import { ComposeChildren } from "@/shared/lib/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/features/theme/theme-provider.client";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <QueryClientProvider client={queryClient} />
      <ThemeProvider />
      <AppSessionProvider />
      {children}
    </ComposeChildren>
  );
}
