import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseIndexRepository } from "@/entities/course/course.server";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { StudentProgress } from "@/entities/student-progress/student-progress";
import { UserId } from "@/kernel";
import { createLearnAbility } from "../_domain/ability";
import { CoursesIndex } from "@/entities/course/course";
import { CourseProgress } from "@/entities/student-progress/_domain/projections";
import { LessonPath } from "@/shared/router";
import { DateTime } from "luxon";

export class GetLastLessonUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewLesson(),
  })
  async exec({ session }: WithSession): Promise<LessonPath | undefined> {
    const { courseIndex, studentProgress } = await this.loadData(
      session.user.id,
    );

    const lastViewedBlockPath = await this.lastViewBlockContentLessonPath({
      studentProgress,
      courseIndex,
    });

    if (lastViewedBlockPath) {
      return lastViewedBlockPath;
    }

    const lastInteractionPath = await this.lastInteractionLessonPath({
      studentProgress,
      courseIndex,
    });

    return lastInteractionPath;
  }

  private async lastViewBlockContentLessonPath({
    studentProgress,
    courseIndex,
  }: {
    courseIndex: CoursesIndex;
    studentProgress: StudentProgress;
  }) {
    if (!studentProgress.lastViewedBlock) {
      return;
    }

    const course = courseIndex.byId[studentProgress.lastViewedBlock.courseId];
    const lesson =
      courseIndex.lessonById[studentProgress.lastViewedBlock.lessonId];

    if (!lesson || !course) {
      return;
    }

    const contentBlock = lesson.blocks.find(
      (block) => block.id === studentProgress.lastViewedBlock?.contentBlockId,
    );

    return {
      courseSlug: course.slug,
      lessonSlug: lesson.slug,
      contentBlockId: contentBlock?.id,
    } satisfies LessonPath;
  }

  private async lastInteractionLessonPath({
    studentProgress,
    courseIndex,
  }: {
    courseIndex: CoursesIndex;
    studentProgress: StudentProgress;
  }) {
    const course = Object.values(studentProgress.courses)
      .filter((course): course is CourseProgress => !!course)
      .sort(
        (a, b) =>
          DateTime.fromISO(a.lastInteractionAt).toMillis() -
          DateTime.fromISO(b.lastInteractionAt).toMillis(),
      )[0];

    if (!course) {
      return;
    }

    const courseEntity = courseIndex.byId[course.courseId];

    const lessonId = courseEntity.lessons[0];

    const lesson = courseIndex.lessonById[lessonId];

    return {
      courseSlug: courseEntity.slug,
      lessonSlug: lesson.slug,
    } satisfies LessonPath;
  }

  private async loadData(userId: UserId) {
    const [studentProgress, courseIndex] = await Promise.all([
      studentProgressRepository.getByStudentId(userId),
      courseIndexRepository.getCoursesIndex(),
    ]);

    return {
      studentProgress,
      courseIndex,
    };
  }
}

export const getLastLessonUseCase = new GetLastLessonUseCase();
