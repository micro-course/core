import { useQuery } from "@tanstack/react-query";
import { useDeferredValue } from "react";
import { useGetCourseLessonsQuery } from "./queries";

export function useLessonsList({
  query,
  courseSlug,
}: {
  query: string;
  courseSlug: string;
}) {
  const courseLessonsQuery = useQuery({
    ...useGetCourseLessonsQuery(courseSlug),
  });

  const deferredQuery = useDeferredValue(query);

  const filterredLessons =
    courseLessonsQuery.data?.lessons
      .map((lesson, i) => ({ ...lesson, title: `${i + 1}. ${lesson.title}` }))
      .filter((lesson) => {
        return lesson.title.toLowerCase().includes(deferredQuery.toLowerCase());
      }) ?? [];

  return {
    filterredLessons,
    isPending: courseLessonsQuery.isPending,
  };
}
