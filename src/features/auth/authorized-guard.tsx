"use client";

import { useAppSession } from "@/entities/user/session.client";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function AuthorizedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAppSession();

  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
  }, [isUnauthenticated]);

  const isLoading =
    session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />
      {session.status === "authenticated" && children}
    </>
  );
}
