import { WithSession } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import { CourseSlug } from "@/entities/course/course";
import { CourseDetails } from "../_domain/projections";
import { courseEntityToCourseDetails } from "../_domain/mappers";
import { NotFoundError } from "@/shared/lib/errors";
import { lessonRepository } from "@/entities/course/lesson.server";
import { LessonEntity, LessonId } from "@/entities/course/lesson";
import { logger } from "@/shared/lib/logger";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { getCourseAction } from "../_domain/methods/get-course-action";

type Query = {
  courseSlug: CourseSlug;
};

export class GetCourseDetailsUseCase {
  async exec(
    { session }: Partial<WithSession>,
    query: Query,
  ): Promise<CourseDetails> {
    const courseEntity = await this.loadCompiledCourse(query.courseSlug);
    const lessons = await this.loadLessons(courseEntity.lessons);
    const progress = session
      ? await studentProgressRepository.getByStudentId(session.user.id)
      : undefined;

    const action = progress
      ? await getCourseAction(progress, courseEntity, lessons)
      : ({ type: "buy" } as const);

    return courseEntityToCourseDetails(courseEntity, lessons, action);
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
