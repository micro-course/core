import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import { createLearnAbility } from "../_domain/ability";
import { courseToListItem, lessonToListItem } from "../_domain/mapper";
import { CourseListItem, LessonListItem } from "../_domain/projections";
import { CourseSlug } from "@/entities/course/course";
import { NotFoundError } from "@/shared/lib/errors";
import { lessonRepository } from "@/entities/course/lesson.server";
import { LessonEntity, LessonId } from "@/entities/course/lesson";
import { logger } from "@/shared/lib/logger";

type Query = {
  courseSlug: CourseSlug;
};

export class GetCourseLessonsUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewCourses(),
  })
  async exec(
    _: WithSession,
    query: Query,
  ): Promise<{
    course: CourseListItem;
    lessons: LessonListItem[];
  }> {
    const { courseEntity, lessonsEntities } = await this.uploadData(
      query.courseSlug,
    );

    return {
      course: courseToListItem(courseEntity),
      lessons: lessonsEntities.map(lessonToListItem),
    };
  }

  private async uploadData(courseSlug: CourseSlug) {
    const courseEntity = await courseRepository.courseBySlug(courseSlug);

    if (!courseEntity) {
      throw new NotFoundError();
    }

    const lessons = await this.loadLessons(courseEntity.lessons);

    return {
      lessonsEntities: lessons,
      courseEntity,
    };
  }

  private loadLessons(lessonsIds: LessonId[]) {
    return Promise.all(
      lessonsIds.map((lessonId) => lessonRepository.lessonById(lessonId)),
    ).then((lessons) => {
      let entities: LessonEntity[] = [];

      lessons.forEach((lesson, i) => {
        if (lesson) {
          entities.push(lesson);
        } else {
          logger.error({
            msg: "Course Lesson not found",
            lessonId: lessonsIds[i],
          });
        }
      });

      return entities;
    });
  }
}

export const getCourseLessonsUseCase = new GetCourseLessonsUseCase();
