import { CourseSlug } from "@/kernel/domain/course";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { courseDetailsApi } from "../_api";
import { useRouter } from "next/navigation";

export function useCourseAction(courseSlug: CourseSlug) {
  const router = useRouter();
  const session = useAppSession();
  const utils = courseDetailsApi.useUtils();

  const { mutate: buyCourse, isPending: isLoadingByCourse } =
    courseDetailsApi.courseDetails.buyCourse.useMutation({
      async onSettled() {
        await utils.courseDetails.getAction.invalidate();
      },
      async onSuccess({ redirectUrl }) {
        router.push(redirectUrl);
      },
    });

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

  if (action.type === "buy") {
    return { ...action, buyCourse, isLoadingByCourse };
  }

  return action;
}
