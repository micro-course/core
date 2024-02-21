"use client";

import { AppSessionProvider } from "@/entities/user/session";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { idbPersister } from "@/shared/api/idb-persister";
import { queryClient } from "@/shared/api/query-client";
import { ComposeChildren } from "@/shared/lib/react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider />
      <AppSessionProvider />
      <PersistQueryClientProvider
        persistOptions={{ persister: idbPersister }}
        client={queryClient}
      />
      {children}
    </ComposeChildren>
  );
}
