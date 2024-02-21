"use client";
import { Sheet } from "@/shared/ui/sheet";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col">
      {children}
      <Sheet open={!!sheet} onOpenChange={() => router.back()}>
        {sheet}
      </Sheet>
    </div>
  );
}
