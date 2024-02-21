import { useDeferredValue } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetCoursesListQuery } from "./queries";

export function useCoursesList({ query }: { query: string }) {
  const coursesListQuery = useQuery({
    ...useGetCoursesListQuery(),
    initialData: {
      myCourses: [],
      otherCourses: [],
    },
  });

  const deferredQuery = useDeferredValue(query);

  const filterredMyCourses = coursesListQuery.data.myCourses.filter(
    (course) => {
      return course.title.toLowerCase().includes(deferredQuery.toLowerCase());
    },
  );

  const filterredNotMyCourses = coursesListQuery.data.otherCourses.filter(
    (course) => {
      return course.title.toLowerCase().includes(deferredQuery.toLowerCase());
    },
  );

  return {
    filterredMyCourses,
    filterredNotMyCourses,

    isPending: coursesListQuery.isPending,
  };
}
