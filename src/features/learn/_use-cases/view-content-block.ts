import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import {
  ContentBlockEntity,
  CourseEntity,
  CourseSlug,
} from "@/entities/course/course";
import { NotFoundError } from "@/shared/lib/errors";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import {
  StudentProgress,
  studentProgressProducer,
} from "@/entities/student-progress/student-progress";
import { lessonRepository } from "@/entities/course/lesson.server";
import { ContentBlockId, UserId } from "@/kernel";
import { LessonEntity, LessonSlug } from "@/entities/course/lesson";
import { createLearnAbility } from "../_domain/ability";
import { compact } from "lodash-es";

type Query = {
  courseSlug: CourseSlug;
  lessonSlug: LessonSlug;
  contentBlockId: ContentBlockId;
};

type Data = {
  course: CourseEntity;
  lesson: LessonEntity;
  contentBlock: ContentBlockEntity;
  studentProgress: StudentProgress;
};

export class ViewContentBlockUseCase {
  @checkAbility({
    createAbility: createLearnAbility,
    check: (ability) => ability.canViewLesson(),
  })
  async exec({ session }: WithSession, query: Query) {
    const data = await this.loadData({
      userId: session.user.id,
      ...query,
    });

    const contentBlockViewedEvent = await this.viewContentBlock(data);

    data.studentProgress = studentProgressProducer.produce(
      data.studentProgress,
      contentBlockViewedEvent,
    );

    const contentBlockCompletedEvent = await this.completeContentBlock(data);

    if (contentBlockCompletedEvent) {
      data.studentProgress = studentProgressProducer.produce(
        data.studentProgress,
        contentBlockCompletedEvent,
      );
    }

    const lessonCompletedEvent = await this.completeLesson(data);

    if (lessonCompletedEvent) {
      data.studentProgress = studentProgressProducer.produce(
        data.studentProgress,
        lessonCompletedEvent,
      );
    }

    const courseCompletedEvent = await this.completeCourse(data);

    if (courseCompletedEvent) {
      data.studentProgress = studentProgressProducer.produce(
        data.studentProgress,
        courseCompletedEvent,
      );
    }

    await studentProgressRepository.applyEvents(
      session.user.id,
      compact([
        contentBlockViewedEvent,
        contentBlockCompletedEvent,
        lessonCompletedEvent,
        courseCompletedEvent,
      ]),
    );
  }

  private async viewContentBlock({
    studentProgress,
    contentBlock,
    lesson,
    course,
  }: Data) {
    const contentBlockViewedEvent = studentProgressRepository.createEvent(
      studentProgress.studentId,
      "ContentBlockViewed",
      {
        courseId: course.id,
        lessonId: lesson.id,
        contentBlockId: contentBlock.id,
      },
    );

    return contentBlockViewedEvent;
  }

  private async completeContentBlock({
    studentProgress,
    contentBlock,
    lesson,
    course,
  }: Data) {
    const contentBlockProgress = studentProgress.contentBlocks[contentBlock.id];

    if (contentBlockProgress?.completedAt) {
      return;
    }

    return studentProgressRepository.createEvent(
      studentProgress.studentId,
      "ContentBlockCompleted",
      {
        courseId: course.id,
        lessonId: lesson.id,
        contentBlockId: contentBlock.id,
      },
    );
  }

  private async completeLesson({
    studentProgress,
    contentBlock,
    lesson,
    course,
  }: Data) {
    const contentBlockProgress = studentProgress.contentBlocks[contentBlock.id];
    const lessonProgress = studentProgress.lessons[lesson.id];

    if (lessonProgress?.completedAt || !contentBlockProgress?.completedAt) {
      return;
    }

    const isLessonCompleted = lesson.blocks.every(
      (block) => studentProgress.contentBlocks[block.id]?.completedAt,
    );

    if (!isLessonCompleted) {
      return;
    }

    return studentProgressRepository.createEvent(
      studentProgress.studentId,
      "LessonCompleted",
      {
        courseId: course.id,
        lessonId: lesson.id,
      },
    );
  }

  private async completeCourse({
    studentProgress,
    contentBlock,
    lesson,
    course,
  }: Data) {
    const contentBlockProgress = studentProgress.contentBlocks[contentBlock.id];
    const lessonProgress = studentProgress.lessons[lesson.id];
    const courseProgress = studentProgress.courses[course.id];

    if (
      courseProgress?.completedAt ||
      !lessonProgress?.completedAt ||
      !contentBlockProgress?.completedAt
    ) {
      return;
    }

    const isCourseCompleted = course.lessons.every(
      (lessonId) => studentProgress.lessons[lessonId]?.completedAt,
    );

    if (!isCourseCompleted) {
      return;
    }

    return studentProgressRepository.createEvent(
      studentProgress.studentId,
      "CourseCompleted",
      {
        courseId: course.id,
      },
    );
  }

  private async loadData({
    userId,
    courseSlug,
    lessonSlug,
    contentBlockId,
  }: {
    userId: UserId;
  } & Query) {
    const [course, lesson, studentProgress] = await Promise.all([
      courseRepository.courseBySlug(courseSlug),
      lessonRepository.lessonBySlug(courseSlug, lessonSlug),
      studentProgressRepository.getByStudentId(userId),
    ]);

    const contentBlock = lesson?.blocks.find(
      (block) => block.id === contentBlockId,
    );

    if (!lesson || !course || !contentBlock) {
      throw new NotFoundError();
    }

    return {
      course,
      lesson,
      contentBlock,
      studentProgress,
    } satisfies Data;
  }
}

export const viewContentBlockUseCase = new ViewContentBlockUseCase();
