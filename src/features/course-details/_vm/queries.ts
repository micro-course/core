import { useServerAction } from "@/shared/lib/server-action/client";
import { getCourseDetailsAction } from "../_actions/get-course-details";
import { CourseSlug } from "@/entities/course/course";
import { useQueryClient } from "@tanstack/react-query";

export const baseKey = "course-details";

export const useCourseDetailsQuery = (courseSlug: CourseSlug) => {
  const getCourseDetails = useServerAction(getCourseDetailsAction);

  return {
    queryKey: [baseKey, "map", courseSlug],
    queryFn: () => getCourseDetails({ courseSlug }),
  };
};

export const useInvalidateCourseDetails = () => {
  const queryClient = useQueryClient();
  return (courseSlug: CourseSlug) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "map", courseSlug],
    });
};
