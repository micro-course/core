import { WithSession, checkAbility } from "@/entities/user/session.server";
import { createLearnAbility } from "../_domain/ability";
import { lessonEntityToLearnLesson } from "../_domain/mapper";
import { LearnLesson } from "../_domain/projections";
import { CourseSlug, CoursesIndex } from "@/entities/course/course";
import { LessonSlug, courseLessonSlug } from "@/entities/course/lesson";
import { lessonRepository } from "@/entities/course/lesson.server";
import { AuthorizatoinError, NotFoundError } from "@/shared/lib/errors";
import { LessonPath } from "@/shared/router";
import { courseIndexRepository } from "@/entities/course/course.server";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { UserId } from "@/kernel";
import { getSortedMyCourses } from "../_domain/methods";
import { checkCourseAccessService } from "@/entities/access/user-access.server";

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
    const { lesson, courseIndex, course } = await this.uploadData(query);

    if (!lesson || !course) {
      throw new NotFoundError();
    }

    if (
      !(await checkCourseAccessService.exec({
        userId: session.user.id,
        course: course,
      }))
    ) {
      throw new AuthorizatoinError("Course not found");
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

    const currentLessonIndex =
      currentCourse?.lessons.findIndex(
        (lessonId) => lessonId === currentLesson.id,
      ) ?? -1;

    const nextLesson =
      currentCourse?.lessons[currentLessonIndex + 1] ?? "never";
    const nextLessonSlug = courseIndex.lessonById[nextLesson]?.slug;

    if (nextLessonSlug) {
      return {
        courseSlug: query.courseSlug,
        lessonSlug: nextLessonSlug,
      };
    }

    const studentProgress =
      await studentProgressRepository.getByStudentId(userId);

    const myCourses = getSortedMyCourses(courseIndex, studentProgress, {
      filterCompleted: true,
    });

    const currentCourseIndex = myCourses.findIndex(
      (course) => course.slug === query.courseSlug,
    );

    const nextCourse = myCourses[currentCourseIndex + 1];
    const nextCourseSlug =
      courseIndex.lessonById[nextCourse?.lessons?.[0]]?.slug;

    if (!nextCourseSlug) {
      return;
    }

    return {
      courseSlug: nextCourse.slug,
      lessonSlug: nextCourseSlug,
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

    const currentLessonIndex =
      currentCourse?.lessons.findIndex(
        (lessonId) => lessonId === currentLesson.id,
      ) ?? -1;

    const prevLesson =
      currentCourse?.lessons?.[currentLessonIndex - 1] ?? "never";
    const prevLessonSlug = courseIndex.lessonById[prevLesson]?.slug;

    if (prevLessonSlug) {
      return {
        courseSlug: query.courseSlug,
        lessonSlug: prevLessonSlug,
      };
    }

    return;
  }

  private async uploadData({ courseSlug, lessonSlug }: Query) {
    const [lesson, courseIndex] = await Promise.all([
      lessonRepository.lessonWithCompiledBlocks(courseSlug, lessonSlug),
      courseIndexRepository.getCoursesIndex(),
    ]);

    const course = courseIndex.bySlug[courseSlug];

    return {
      lesson,
      course,
      courseIndex,
    };
  }
}

export const getLearnLessonUseCase = new GetLearnLessonUseCase();
