"use client";

import { createCmsAbility } from "@/features/cms";
import { useAbility, useAppSession } from "@/kernel/lib/next-auth/client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { AdminHeader } from "./_admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = useAppSession();
  const ability = useAbility(createCmsAbility);
  const router = useRouter();

  useLayoutEffect(() => {
    if (ability && !ability.canManageCourses()) {
      router.push("/");
    }
  }, [session.status, router, ability]);

  if (ability?.canManageCourses()) {
    return (
      <div className="flex grow flex-col">
        <AdminHeader />
        {children}
      </div>
    );
  }

  return null;
}
