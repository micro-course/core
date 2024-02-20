import { useServerAction } from "@/shared/lib/server-action/client";
import { getCoursesListAction } from "../_actions/get-courses-list";
import { CourseSlug } from "@/entities/course/course";
import { getCourseLessonsAction } from "../_actions/get-course-lessons";
import { LessonSlug } from "@/entities/course/lesson";
import { getLearnLessonAction } from "../_actions/get-learn-lesson";
import { useQueryClient } from "@tanstack/react-query";
import { getLastLessonAction } from "../_actions/get-last-lesson";
import { getCheckAccessAction } from "../_actions/check-access";
import { learnBaseKey, learnCourseKey, learnCoursesKey } from "@/kernel";

export const baseKey = "learn";

export const useGetCoursesListQuery = () => {
  const getCoursesList = useServerAction(getCoursesListAction);

  return {
    queryKey: learnCoursesKey,
    queryFn: () => getCoursesList(),
  };
};

export const useGetCourseAccessQuery = (courseSlug: CourseSlug) => {
  const checkAccess = useServerAction(getCheckAccessAction);

  return {
    queryKey: [...learnCourseKey(courseSlug), "access"],
    queryFn: () =>
      checkAccess({
        courseSlug,
      }),
  };
};

export const useGetCourseLessonsQuery = (slug?: CourseSlug) => {
  const getCourseLessons = useServerAction(getCourseLessonsAction);

  return {
    queryKey: [...learnCourseKey(slug), "lessons"],
    queryFn: () =>
      slug ? getCourseLessons({ courseSlug: slug }) : Promise.resolve(null),
  };
};

export const useGetLearnLessonQuery = (
  courseSlug: CourseSlug,
  lessonSlug: LessonSlug,
) => {
  const getLearnLesson = useServerAction(getLearnLessonAction);

  return {
    queryKey: [...learnCourseKey(courseSlug), "lessons", lessonSlug, "content"],
    queryFn: () => getLearnLesson({ courseSlug, lessonSlug }),
  };
};

export const useLastLessonQuery = () => {
  const lastLesson = useServerAction(getLastLessonAction);
  return {
    queryKey: [...learnCoursesKey, "last-lesson"],
    queryFn: () => lastLesson(),
    gcTime: 0,
  };
};

export const useInvalidateLearn = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: [learnBaseKey],
    });
};
