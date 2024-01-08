"use client";

import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const session = useSession();

  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
  }, [isUnauthenticated]);

  return (
    <>
      {(session.status === "loading" ||
        session.status === "unauthenticated") && <FullPageSpinner />}

      {session.status === "authenticated" && children}
    </>
  );
}
