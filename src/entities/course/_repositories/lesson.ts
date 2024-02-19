import { cachedAsyncMethod } from "@/shared/lib/cache";
import { compiledContentCacheStrategy } from "./cache-strategy";
import { courseIndexRepository } from "./course-index";
import {
  LessonId,
  CourseLessonSlug,
  LessonEntity,
  CourseSlug,
  LessonSlug,
  courseLessonSlug,
} from "../_domain/entities";
import { compileMDX } from "@/shared/lib/mdx/server";

export class LessonRepository {
  async lessonById(id: LessonId) {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.lessonById[id] as LessonEntity | undefined;
  }

  async lessonsByIds(ids: LessonId[]) {
    const index = await courseIndexRepository.getCoursesIndex();
    return Promise.all(ids.map((id) => index.lessonById[id])).then(
      (r) => r.filter(Boolean) as LessonEntity[],
    );
  }

  async lessonBySlug(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    const index = await courseIndexRepository.getCoursesIndex();

    const lesson = index.lessonBySlug[courseLessonSlug(courseSlug, lessonSlug)];

    return lesson as LessonEntity | undefined;
  }

  @cachedAsyncMethod(
    compiledContentCacheStrategy,
    (courseSlug: CourseSlug, lessonSlug: LessonSlug) => [
      "lessonWithCompiledBlocks",
      { courseSlug, lessonSlug },
    ],
  )
  async lessonWithCompiledBlocks(
    courseSlug: CourseSlug,
    lessonSlug: LessonSlug,
  ) {
    const lesson = await this.lessonBySlug(courseSlug, lessonSlug);

    if (!lesson) {
      return undefined;
    }

    return {
      ...lesson,
      blocks: await Promise.all(
        lesson.blocks.map(async (block) => {
          if (block.type === "text") {
            return {
              ...block,
              text: await compileMDX(block.text).then((r) => r.code),
            };
          }
          return block;
        }),
      ),
    };
  }

  @cachedAsyncMethod(compiledContentCacheStrategy, (id) => [
    "lessonWithCompiledShortDesctiption",
    id,
  ])
  async lessonWithCompiledShortDesctiption(id: LessonId) {
    const lesson = await this.lessonById(id);

    if (!lesson) {
      return undefined;
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
