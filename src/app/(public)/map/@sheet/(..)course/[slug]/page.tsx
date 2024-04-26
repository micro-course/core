"use client";
import { CourseSlug } from "@/kernel/domain/course";
import { SheetContent, Sheet } from "@/shared/ui/sheet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseSheetContentPage({
  params: { slug },
}: {
  params: { slug: CourseSlug };
}) {
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
        Course slug {slug}
      </SheetContent>
    </Sheet>
  );
}
