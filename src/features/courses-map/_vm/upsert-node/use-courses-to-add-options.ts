import { CourseId } from "@/kernel/domain/course";
import { coursesMapApi } from "../../_api";

export function useCoursesToAddOptions(courseId?: CourseId) {
  const { isPending, data } = coursesMapApi.coursesMap.coursesToAdd.useQuery(
    { notFilterCourseId: courseId },
    {
      select: (courses) =>
        courses?.map((course) => ({ label: course.title, value: course.id })),
    },
  );

  return {
    isPending,
    options: data,
  };
}
