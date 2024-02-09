import { CourseSlug } from "@/entities/course/course";
import { useDeferredValue } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetCoursesListQuery } from "./queries";

export function useCoursesList({
  currentCourseSlug,
  query,
}: {
  currentCourseSlug: CourseSlug;
  query: string;
}) {
  const coursesListQuery = useQuery({
    ...useGetCoursesListQuery(),
    initialData: {
      myCourses: [],
      otherCourses: [],
    },
  });

  const deferredQuery = useDeferredValue(query);

  let filterredMyCourses = coursesListQuery.data.myCourses.filter((course) => {
    return course.title.toLowerCase().includes(deferredQuery.toLowerCase());
  });

  const currentCourse = filterredMyCourses.find(
    (course) => course.slug === currentCourseSlug,
  );

  filterredMyCourses = filterredMyCourses.filter(
    (course) => course.slug !== currentCourseSlug,
  );

  const filterredNotMyCourses = coursesListQuery.data.otherCourses.filter(
    (course) => {
      return course.title.toLowerCase().includes(deferredQuery.toLowerCase());
    },
  );

  return {
    currentCourse,
    filterredMyCourses,
    filterredNotMyCourses,

    isPending: coursesListQuery.isPending,
  };
}
