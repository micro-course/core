import { cache } from "react";
import { CourseEntity } from "../_domain/types";
import { contentApi } from "@/shared/api/content";
import { logger } from "@/shared/lib/logger";
class CoursesRepository {
  getCoursesList = cache(async (): Promise<CourseEntity[]> => {
    const manifest = await contentApi.fetchManifest();

    const fetchCourse = async (courseSlug: string): Promise<CourseEntity> => {
      const course = await contentApi.fetchCourse(courseSlug);

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        slug: courseSlug,
      };
    };

    const setteldCourses = await Promise.allSettled(
      manifest.courses.map(fetchCourse),
    );

    setteldCourses.forEach((value, i) => {
      if (value.status === "rejected") {
        logger.error({
          msg: "Course by slug not found",
          slug: manifest.courses[i],
          erorr: value.reason,
        });
      }
    });

    return setteldCourses
      .filter(
        (courseResult): courseResult is PromiseFulfilledResult<CourseEntity> =>
          courseResult.status === "fulfilled",
      )
      .map((course) => {
        return course.value;
      });
  });
}

export const coursesRepository = new CoursesRepository();
