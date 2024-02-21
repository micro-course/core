import { useServerAction } from "@/shared/lib/server-action/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseEnterAction } from "../_actions/course-enter";
import { useRouter } from "next/navigation";
import { getLessonPath } from "@/shared/router";
import { useAbility } from "@/entities/user/session";
import { createCourseDetailsAbility } from "../_domain/ablility";
import { signIn } from "next-auth/react";
import { courseDetailsKey, learnBaseKey } from "@/kernel";

export function useCourseEnter() {
  const queryClient = useQueryClient();
  const abillity = useAbility(createCourseDetailsAbility);
  const router = useRouter();
  const courseEnter = useServerAction(courseEnterAction);

  const enterMutation = useMutation({
    mutationFn: courseEnter,
    async onSuccess({ targetLesson }, { courseSlug }) {
      queryClient.removeQueries({
        queryKey: [learnBaseKey],
        exact: false,
      });
      queryClient.removeQueries({
        queryKey: courseDetailsKey(courseSlug),
        exact: false,
      });

      router.push(getLessonPath(targetLesson));
    },
  });

  const handleEnter = (courseSlug: string) => {
    if (abillity?.canEnter()) {
      enterMutation.mutate({
        courseSlug,
      });
    } else {
      signIn();
    }
  };

  return {
    handleEnter,
    isPending: enterMutation.isPending,
  };
}
