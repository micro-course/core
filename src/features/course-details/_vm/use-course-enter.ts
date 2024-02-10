import { useServerAction } from "@/shared/lib/server-action/client";
import { useMutation } from "@tanstack/react-query";
import { courseEnterAction } from "../_actions/course-enter";
import { useInvalidateCourseDetails } from "./queries";
import { useRouter } from "next/navigation";

export function useCourseEnter() {
  const router = useRouter();
  const invalidateQueries = useInvalidateCourseDetails();
  const courseEnter = useServerAction(courseEnterAction);

  const enterMutation = useMutation({
    mutationFn: courseEnter,
    async onSuccess({ targetLesson }, { courseSlug }) {
      invalidateQueries(courseSlug);
      router.push(
        `/learn/course/${courseSlug}/lesson/${targetLesson.lessonSlug}`,
      );
    },
  });

  return {
    mutate: enterMutation.mutate,
    isPending: enterMutation.isPending,
  };
}
