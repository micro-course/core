import { CourseSlug } from "@/kernel/domain/course";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { courseDetailsApi } from "../_api";

export function useAcourseAction(courseSlug: CourseSlug) {
  const session = useAppSession();

  const { data: action, isPending } =
    courseDetailsApi.courseDetails.getAction.useQuery(
      { courseSlug: courseSlug },
      { enabled: session.status === "authenticated" },
    );

  if (session.status === "loading" || isPending) {
    return {
      type: "pending",
    } as const;
  }

  if (!action) {
    return { type: "pending" } as const;
  }

  return action;
}
