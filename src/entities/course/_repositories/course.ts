import { cachedAsyncMethod } from "@/shared/lib/cache";
import { CourseEntity, CourseId, CourseSlug } from "../course";
import { courseIndexRepository } from "./course-index";
import { compiledContentCacheStrategy } from "./cache-strategy";
import { compileMDX } from "@/shared/lib/mdx/server";

export class CourseRepository {
  async coursesList() {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.list;
  }

  async courseById(id: CourseId) {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.byId[id] as CourseEntity | undefined;
  }

  async courseBySlug(slug: CourseSlug) {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.bySlug[slug] as CourseEntity | undefined;
  }

  @cachedAsyncMethod(compiledContentCacheStrategy, (slug) => [
    "compiled-course",
    slug,
  ])
  async compiledCourseBySlug(slug: CourseSlug) {
    const courseEntity = await this.courseBySlug(slug);

    if (!courseEntity) {
      return;
    }

    return {
      ...courseEntity,
      description: await compileMDX(courseEntity.description).then(
        (r) => r.code,
      ),
    };
  }
}

/** @deprecated */
export const courseRepository = new CourseRepository();
