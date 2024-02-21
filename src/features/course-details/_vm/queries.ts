import { useServerAction } from "@/shared/lib/server-action/client";
import { getCourseDetailsAction } from "../_actions/get-course-details";
import { CourseSlug } from "@/entities/course/course";
import { useQueryClient } from "@tanstack/react-query";
import { courseDetailsKey } from "@/kernel";

export const baseKey = "course-details";

export const useCourseDetailsQuery = (courseSlug: CourseSlug) => {
  const getCourseDetails = useServerAction(getCourseDetailsAction);

  return {
    queryKey: [...courseDetailsKey(courseSlug)],
    queryFn: () => getCourseDetails({ courseSlug }),
  };
};
