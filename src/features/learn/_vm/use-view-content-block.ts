import { CourseSlug } from "@/entities/course/course";
import { LessonSlug } from "@/entities/course/lesson";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { viewContentBlockAction } from "../_actions/view-content-block";
import { useServerAction } from "@/shared/lib/server-action/client";
import { useInvalidateLearn } from "./queries";

export function useViewContentBlock({
  contentBlockId,
  lessonSlug,
  courseSlug,
}: {
  courseSlug: CourseSlug;
  lessonSlug: LessonSlug;
  contentBlockId: string;
}) {
  const viewContentBlock = useServerAction(viewContentBlockAction);
  const contentBlockRef = useRef<HTMLDivElement>(null);
  const invalidateLearn = useInvalidateLearn();

  const intersection = useIntersection(contentBlockRef, {
    rootMargin: "-40px 0px 0px 0px",
  });

  const { mutate: viewContentBlockMutate } = useMutation({
    mutationFn: viewContentBlock,
    onSettled() {
      invalidateLearn();
    },
  });

  useEffect(() => {
    if (intersection) {
      viewContentBlockMutate({
        contentBlockId,
        lessonSlug,
        courseSlug,
      });
      return;
    }
  }, [
    intersection,
    viewContentBlockMutate,
    contentBlockId,
    lessonSlug,
    courseSlug,
  ]);

  return {
    contentBlockRef,
  };
}
