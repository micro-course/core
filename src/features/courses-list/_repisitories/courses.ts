import { contentApi } from "@/shared/api/content";
import { logger } from "@/shared/lib/logger";
class CoursesRepository {
  getCoursesList = async () => {
    const manifest = await contentApi.fetchManifest();

    const fetchLesson = async (
      courseSlug: string,
      lessonSlug: string,
    ): Promise<LessonListElement> => {
      const lesson = await contentApi.fetchLesson(courseSlug, lessonSlug);

      return {
        id: lesson.id,
        slug: lessonSlug,
        title: lesson.title,
      };
    };

    const fetchCourse = async (
      courseSlug: string,
    ): Promise<CourseListElement> => {
      const course = await contentApi.fetchCourse(courseSlug);

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        slug: courseSlug,
        lessons: await Promise.all(
          course.lessons.map((lessonSlug) =>
            fetchLesson(courseSlug, lessonSlug),
          ),
        ),
      };
    };

    const setteldCourses = await Promise.allSettled(
      manifest.courses.map(fetchCourse),
    );

    setteldCourses.forEach((value) => {
      if (value.status === "rejected") {
        logger.error({
          msg: "Course from manifes not found",
          error: value.reason,
        });
      }
    });

    return setteldCourses
      .filter(
        (
          courseResult,
        ): courseResult is PromiseFulfilledResult<CourseListElement> =>
          courseResult.status === "fulfilled",
      )
      .map((course) => {
        return course.value;
      });
  };
}

export const coursesRepository = new CoursesRepository();
