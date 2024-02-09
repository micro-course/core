import { useServerAction } from "@/shared/lib/server-action/client";
import { getCoursesListAction } from "../_actions/get-courses-list";
import { CourseSlug } from "@/entities/course/course";
import { getCourseLessonsAction } from "../_actions/get-course-lessons";

export const baseKey = "learn";

export const useGetCoursesListQuery = () => {
  const getCoursesList = useServerAction(getCoursesListAction);

  return {
    queryKey: [baseKey, "courses-list"],
    queryFn: () => getCoursesList(),
  };
};

export const useGetCourseLessonsQuery = (slug?: CourseSlug) => {
  const getCourseLessons = useServerAction(getCourseLessonsAction);

  return {
    queryKey: [baseKey, "course", slug, "lessons"],
    queryFn: () =>
      slug ? getCourseLessons({ courseSlug: slug }) : Promise.resolve(null),
  };
};
