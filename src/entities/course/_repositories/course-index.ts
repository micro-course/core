import {
  CourseId,
  CourseSlug,
  LessonEntity,
  LessonSlug,
  courseLessonSlug,
} from "../_domain/entities";

import { CoursesIndex } from "../_domain/projections";

import { contentApi } from "@/shared/api/content";
import { cachedAsyncMethod } from "@/shared/lib/cache";
import { contentCacheStrategy } from "./cache-strategy";
import { logger } from "@/shared/lib/logger";

class CourseIndexRepository {
  @cachedAsyncMethod(contentCacheStrategy, () => ["getCoursesIndex"])
  async getCoursesIndex(): Promise<CoursesIndex> {
    const manifest = await contentApi.fetchManifestQuery();

    const coursesResult = await Promise.allSettled(
      manifest.courses.map((courseSlug) => this.fetchCourse(courseSlug)),
    );

    const coursesEntries = this.filterSuccess(
      coursesResult,
      "Failed to fetch course",
      manifest.courses.map((courseSlug) => ({ courseSlug })),
    );

    const coursesIndex: CoursesIndex = {
      list: [],
      bySlug: {},
      byId: {},
      lessonById: {},
      lessonBySlug: {},
    };

    for (const [course, lessons] of coursesEntries) {
      coursesIndex.list.push(course);
      coursesIndex.bySlug[course.slug] = course;
      coursesIndex.byId[course.id] = course;

      for (const lesson of lessons) {
        coursesIndex.lessonById[lesson.id] = lesson;
        coursesIndex.lessonBySlug[courseLessonSlug(course.slug, lesson.slug)] =
          lesson;
      }
    }

    return coursesIndex;
  }

  private async fetchCourse(courseSlug: string) {
    const course = await contentApi.fetchCourseQuery(courseSlug);

    const lessonsResult = await Promise.allSettled(
      course.lessons.map((lessonSlug) =>
        this.fetchLesson(courseSlug, lessonSlug, { courseId: course.id }),
      ),
    );

    const lessonsEntities = this.filterSuccess(
      lessonsResult,
      "Failed to fetch course lesson",
      course.lessons.map((lessonSlug) => ({ lessonSlug, courseSlug })),
    );

    const courseEntity = {
      id: course.id,
      slug: courseSlug,
      title: course.title,
      thumbnail: course.thumbnail,
      description: course.description,
      dependencies: course.dependencies ?? [],
      lessons: lessonsEntities.map((lesson) => lesson.id),
      shortDescription: course.shortDescription,
    };

    return [courseEntity, lessonsEntities] as const;
  }

  private fetchLesson = async (
    courseSlug: CourseSlug,
    lessonSlug: LessonSlug,
    meta: { courseId: CourseId },
  ): Promise<LessonEntity> => {
    const lesson = await contentApi.fetchLessonQuery(courseSlug, lessonSlug);

    return {
      id: lesson.id,
      slug: lessonSlug,
      courseId: meta.courseId,
      title: lesson.title,
      blocks: lesson.blocks,
    };
  };

  private filterSuccess = <T>(
    settled: PromiseSettledResult<T>[],
    message: string,
    meta: unknown[],
  ): T[] => {
    settled.forEach((value, i) => {
      if (value.status === "rejected") {
        logger.error({
          msg: message,
          erorr: value.reason,
          meta: meta[i],
        });
      }
    });

    return settled
      .filter(
        (courseResult): courseResult is PromiseFulfilledResult<T> =>
          courseResult.status === "fulfilled",
      )
      .map((course) => {
        return course.value;
      });
  };
}

export const courseIndexRepository = new CourseIndexRepository();
