import { WithSession, checkAbility } from "@/entities/user/session.server";
import { createLearnAbility } from "../_domain/ability";
import { lessonEntityToLearnLesson } from "../_domain/mapper";
import { LearnLesson } from "../_domain/projections";
import { CourseSlug, CoursesIndex } from "@/entities/course/course";
import { LessonSlug, courseLessonSlug } from "@/entities/course/lesson";
import { lessonRepository } from "@/entities/course/lesson.server";
import { NotFoundError } from "@/shared/lib/errors";
import { LessonPath } from "@/shared/router";
import { courseIndexRepository } from "@/entities/course/course.server";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { UserId } from "@/kernel";
import { getSortedMyCourses } from "../_domain/methods";

type Query = {
  courseSlug: CourseSlug;
  lessonSlug: LessonSlug;
};

export class GetLearnLessonUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewLesson(),
  })
  async exec(
    { session }: WithSession,
    query: Query,
  ): Promise<{
    lesson: LearnLesson;
    prev?: LessonPath;
    next?: LessonPath;
  }> {
    const { lesson, courseIndex } = await this.uploadData(query);

    if (!lesson) {
      throw new NotFoundError();
    }

    return {
      next: await this.getNext(query, courseIndex, session.user.id),
      lesson: lessonEntityToLearnLesson(lesson),
      prev: await this.getPrev(query, courseIndex),
    };
  }

  private async getNext(
    query: Query,
    courseIndex: CoursesIndex,
    userId: UserId,
  ) {
    const currentCourse = courseIndex.bySlug[query.courseSlug];
    const currentLesson =
      courseIndex.lessonBySlug[
        courseLessonSlug(query.courseSlug, query.lessonSlug)
      ];

    if (!currentLesson || !currentLesson) {
      throw new NotFoundError();
    }

    const currentLessonIndex = currentCourse.lessons.findIndex(
      (lessonId) => lessonId === currentLesson.id,
    );

    const nextLesson = currentCourse.lessons[currentLessonIndex + 1];

    if (nextLesson) {
      return {
        courseSlug: query.courseSlug,
        lessonSlug: courseIndex.lessonById[nextLesson].slug,
      };
    }

    const studentProgress =
      await studentProgressRepository.getByStudentId(userId);

    const myCourses = getSortedMyCourses(courseIndex, studentProgress);

    const currentCourseIndex = myCourses.findIndex(
      (course) => course.slug === query.courseSlug,
    );

    const nextCourse = myCourses[currentCourseIndex + 1];

    if (!nextCourse) {
      return;
    }

    return {
      courseSlug: nextCourse.slug,
      lessonSlug: courseIndex.lessonById[nextCourse.lessons[0]].slug,
    };
  }

  private async getPrev(query: Query, courseIndex: CoursesIndex) {
    const currentCourse = courseIndex.bySlug[query.courseSlug];
    const currentLesson =
      courseIndex.lessonBySlug[
        courseLessonSlug(query.courseSlug, query.lessonSlug)
      ];

    if (!currentLesson || !currentLesson) {
      throw new NotFoundError();
    }

    const currentLessonIndex = currentCourse.lessons.findIndex(
      (lessonId) => lessonId === currentLesson.id,
    );

    const prevLesson = currentCourse.lessons[currentLessonIndex - 1];

    if (prevLesson) {
      return {
        courseSlug: query.courseSlug,
        lessonSlug: courseIndex.lessonById[prevLesson].slug,
      };
    }

    return;
  }

  private async uploadData({ courseSlug, lessonSlug }: Query) {
    const [lesson, courseIndex] = await Promise.all([
      lessonRepository.lessonWithCompiledBlocks(courseSlug, lessonSlug),
      courseIndexRepository.getCoursesIndex(),
    ]);

    return {
      lesson,
      courseIndex,
    };
  }
}

export const getLearnLessonUseCase = new GetLearnLessonUseCase();
