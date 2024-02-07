import { cachedAsyncMethod } from "@/shared/lib/cache";
import { compiledContentCacheStrategy } from "./cache-strategy";
import { courseIndexRepository } from "./course-index";
import { LessonId, CourseLessonSlug } from "../_domain/entities";
import { compileMDX } from "@/shared/lib/mdx/server";
import { NotFoundError } from "@/shared/lib/errors";

export class LessonRepository {
  async lessonById(id: LessonId) {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.lessonById[id];
  }

  @cachedAsyncMethod(compiledContentCacheStrategy, (id) => [
    "lessonWithCompiledShortDesctiption",
    id,
  ])
  async lessonWithCompiledShortDesctiption(id: LessonId) {
    const lesson = await this.lessonById(id);

    if (!lesson) {
      throw new NotFoundError();
    }

    return {
      ...lesson,
      shortDescription: lesson.shortDescription
        ? await compileMDX(lesson.shortDescription).then((r) => r.code)
        : undefined,
    };
  }

  async lessonByCourseLessonSlug(slug: CourseLessonSlug) {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.lessonBySlug[slug];
  }
}

export const lessonRepository = new LessonRepository();
