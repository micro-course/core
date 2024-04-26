import { Lesson } from "../_domain/types";
import { contentApi } from "@/shared/api/content";
import { logger } from "@/shared/lib/logger";
import { injectable } from "inversify";
import { allSuccess } from "@/shared/lib/promise";
import { CourseSlug, LessonSlug } from "@/kernel/domain/course";
import { isDefined } from "@/shared/lib/assert";
@injectable()
export class LessonRepository {
  courseLessons = async (courseSlug: CourseSlug): Promise<Lesson[]> => {
    const course = await contentApi.fetchCourse(courseSlug);

    const fetchLesson = async (lessonSlug: LessonSlug): Promise<Lesson> => {
      const { blocks, id, title, shortDescription } =
        await contentApi.fetchLesson(courseSlug, lessonSlug);

      return {
        id,
        title,
        shortDescription,
        blocks: blocks
          .map((block) => (block.type === "text" ? block : undefined))
          .filter(isDefined),
        courseId: course.id,
        slug: lessonSlug,
      };
    };

    return allSuccess(course.lessons.map(fetchLesson), (value, i) => {
      if (value.status === "rejected") {
        logger.error({
          msg: "Lesson by slug not found",
          slug: course.lessons[i],
          erorr: value.reason,
        });
      }
    });
  };
}
