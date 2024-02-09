import { WithSession, checkAbility } from "@/entities/user/session.server";
import { createLearnAbility } from "../_domain/ability";
import { lessonEntityToLearnLesson } from "../_domain/mapper";
import { LearnLesson } from "../_domain/projections";
import { CourseSlug } from "@/entities/course/course";
import { LessonSlug } from "@/entities/course/lesson";
import { lessonRepository } from "@/entities/course/lesson.server";
import { NotFoundError } from "@/shared/lib/errors";

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
    _: WithSession,
    query: Query,
  ): Promise<{
    lesson: LearnLesson;
  }> {
    const { lesson } = await this.uploadData(query);

    if (!lesson) {
      throw new NotFoundError();
    }

    return {
      lesson: lessonEntityToLearnLesson(lesson),
    };
  }

  private async uploadData({ courseSlug, lessonSlug }: Query) {
    const lesson = await lessonRepository.lessonWithCompiledBlocks(
      courseSlug,
      lessonSlug,
    );

    return {
      lesson,
    };
  }
}

export const getLearnLessonUseCase = new GetLearnLessonUseCase();
