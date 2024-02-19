"use client";

import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useQuery } from "@tanstack/react-query";
import { CourseSlug } from "@/kernel";
import { useGetCourseAccessQuery } from "./_vm/queries";
import { useEffect } from "react";
import { useToast } from "@/shared/ui/use-toast";
import { useRouter } from "next/navigation";

export function CheckAccessGuard({
  children,
  courseSlug,
}: {
  children: React.ReactNode;
  courseSlug: CourseSlug;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const checkAccessQuery = useQuery({
    ...useGetCourseAccessQuery(courseSlug),
    retry: 0,
  });

  useEffect(() => {
    if (checkAccessQuery.error) {
      if (checkAccessQuery.error instanceof Error) {
        toast({
          variant: "destructive",
          description: checkAccessQuery.error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка доступа",
        });
      }
      router.replace(`/course/${courseSlug}`);
    }
  }, [checkAccessQuery.error, toast, router, courseSlug]);

  return (
    <>
      <FullPageSpinner isLoading={checkAccessQuery.isPending} />
      {checkAccessQuery.data && children}
    </>
  );
}
