import { CourseSlug } from "@/kernel/domain/course";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { courseDetailsApi } from "../_api";
import { usePathname } from "next/navigation";
import { getCoursePurchasePath } from "@/kernel/lib/router";

export function useCourseAction(courseSlug: CourseSlug) {
  const pathname = usePathname();
  const session = useAppSession();

  const { data: action, isPending } =
    courseDetailsApi.courseDetails.getAction.useQuery({
      courseSlug: courseSlug,
    });

  if (session.status === "loading" || isPending) {
    return {
      type: "pending",
    } as const;
  }

  if (!action) {
    return { type: "pending" } as const;
  }

  if (action.type === "buy") {
    return { ...action, href: getCoursePurchasePath(courseSlug, pathname) };
  }

  return action;
}
