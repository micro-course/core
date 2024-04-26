"use client";

import { SheetContent, Sheet } from "@/shared/ui/sheet";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(
    () => () => {
      if (isOpen) {
        const listener = () => {
          router.back();
          window.removeEventListener("animationend", listener);
        };
        window.addEventListener("animationend", listener);
      }
    },
    [isOpen, router],
  );
  return (
    <Sheet open={!!isOpen} onOpenChange={() => setIsOpen(false)}>
      <SheetContent className="w-full sm:w-[700px] !max-w-full max-h-screen overflow-y-auto overflow-x-hidden">
        {children}
      </SheetContent>
    </Sheet>
  );
}
