import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import { CourseSlug } from "@/entities/course/course";
import { createCourseDetailsAbility } from "../_domain/ablility";
import { CourseDetails } from "../_domain/projections";
import { courseEntityToCourseDetails } from "../_domain/mappers";
import { NotFoundError } from "@/shared/lib/errors";
import { lessonRepository } from "@/entities/course/lesson.server";
import { LessonEntity, LessonId } from "@/entities/course/lesson";
import { logger } from "@/shared/lib/logger";

type Query = {
  courseSlug: CourseSlug;
};

export class GetCourseDetailsUseCase {
  @checkAbility({
    createAbility: createCourseDetailsAbility,
    check: (ability) => ability.canView(),
  })
  async exec({}: WithSession, query: Query): Promise<CourseDetails> {
    const courseEntity = await this.loadCompiledCourse(query.courseSlug);
    const lessons = await this.loadLessons(courseEntity.lessons);

    return courseEntityToCourseDetails(courseEntity, lessons);
  }

  async loadCompiledCourse(courseSlug: CourseSlug) {
    const courseEntity =
      await courseRepository.compiledCourseBySlug(courseSlug);
    if (!courseEntity) {
      throw new NotFoundError(`Course by slug ${courseSlug} not found`);
    }

    return courseEntity;
  }

  loadLessons(lessonsIds: LessonId[]) {
    return Promise.all(
      lessonsIds.map((lessonId) =>
        lessonRepository.lessonWithCompiledShortDesctiption(lessonId),
      ),
    ).then((lessons) => {
      let entities: LessonEntity[] = [];

      lessons.forEach((lesson, i) => {
        if (lesson) {
          entities.push(lesson);
        } else {
          logger.error({
            msg: "Course details Lesson not found",
            lessonId: lessonsIds[i],
          });
        }
      });

      return entities;
    });
  }
}

export const getCourseDetailsUseCase = new GetCourseDetailsUseCase();
