import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import { CourseSlug } from "@/entities/course/course";
import { createCourseDetailsAbility } from "../_domain/ablility";
import { NotFoundError, UnknownServerError } from "@/shared/lib/errors";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { studentProgressProducer } from "@/entities/student-progress/student-progress";
import { lessonRepository } from "@/entities/course/lesson.server";
import { LessonId } from "@/kernel";
import { getCourseAction } from "../_domain/methods/get-course-action";
import { LessonEntity } from "@/entities/course/lesson";

type Query = {
  courseSlug: CourseSlug;
};

export class CourseEnterUseCase {
  @checkAbility({
    createAbility: createCourseDetailsAbility,
    check: (ability) => ability.canView(),
  })
  async exec({ session }: WithSession, query: Query) {
    const courseEntity = await this.loadCompiledCourse(query.courseSlug);
    const lessons = await this.loadLessons(courseEntity.lessons);

    let studentProgress = await studentProgressRepository.getByStudentId(
      session.user.id,
    );

    const courseEnteredEvent = studentProgressRepository.createEvent(
      session.user.id,
      "CourseEntered",
      { courseId: courseEntity.id },
    );

    studentProgress = studentProgressProducer.produce(
      studentProgress,
      courseEnteredEvent,
    );

    const action = await getCourseAction(
      studentProgress,
      courseEntity,
      lessons,
    );

    if (action.type !== "continue") {
      throw new UnknownServerError(
        `Error while course ${courseEntity.id} enter`,
      );
    }

    await studentProgressRepository.applyEvents(session.user.id, [
      courseEnteredEvent,
    ]);

    return action;
  }

  private async loadCompiledCourse(courseSlug: CourseSlug) {
    const courseEntity =
      await courseRepository.compiledCourseBySlug(courseSlug);
    if (!courseEntity) {
      throw new NotFoundError(`Course by slug ${courseSlug} not found`);
    }

    return courseEntity;
  }

  private async loadLessons(lessonsIds: LessonId[]) {
    return Promise.all(
      lessonsIds.map((lessonId) => lessonRepository.lessonById(lessonId)),
    ).then((r) => r.filter((lesson): lesson is LessonEntity => !!lesson));
  }
}

export const courseEnterUseCase = new CourseEnterUseCase();
