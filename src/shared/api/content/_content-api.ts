import { join } from "path";
import { CacheStategy } from "./_lib/cache-strategy";
import { ContentParser } from "./_lib/content-parser";
import { FileFetcher } from "./_lib/file-fetcher";
import manifestSchema from "./_schemas/manifest.schema.json";
import courseSchema from "./_schemas/course.schema.json";
import lessonSchema from "./_schemas/lesson.schema.json";
import { Course } from "./_schemas/course.schema";
import { Lesson } from "./_schemas/lesson.schema";
import { Manifest } from "./_schemas/manifest.schema";
import { bundleMDX } from "mdx-bundler";
import { compileMDX } from "@/shared/lib/mdx/server";

interface Deps {
  cacheStrategy: CacheStategy;
  contentParser: ContentParser;
  fileFetcher: FileFetcher;
}

type CourseSlug = string;
type LessonSlug = string;

export class ContentApi {
  constructor(
    private baseUrl: string,
    private d: Deps,
  ) {}

  async fetchManifest() {
    return this.d.cacheStrategy.fetch(["manifest"], () =>
      this.fetchManifestQuery(),
    );
  }

  private async fetchManifestQuery() {
    const text = await this.d.fileFetcher.fetchText(this.getManifestUrl());
    return await this.d.contentParser.parse<Manifest>(text, manifestSchema);
  }

  async fetchCourse(slug: CourseSlug) {
    return this.d.cacheStrategy.fetch(["course", slug], () =>
      this.fetchCourseQuery(slug),
    );
  }

  private async fetchCourseQuery(slug: string) {
    const text = await this.d.fileFetcher.fetchText(this.getCourseUrl(slug));
    const course = await this.d.contentParser.parse<Course>(text, courseSchema);

    return {
      ...course,
      description: (await compileMDX(course.description)).code,
      shortDescription: course.shortDescription
        ? (await compileMDX(course.shortDescription)).code
        : undefined,
    };
  }

  async fetchLesson(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    return this.d.cacheStrategy.fetch(["lesson", courseSlug, lessonSlug], () =>
      this.fetchLessonQuery(courseSlug, lessonSlug),
    );
  }

  private async fetchLessonQuery(
    courseSlug: CourseSlug,
    lessonSlug: LessonSlug,
  ) {
    const text = await this.d.fileFetcher.fetchText(
      this.getLessonUrl(courseSlug, lessonSlug),
    );
    return await this.d.contentParser.parse<Lesson>(text, lessonSchema);
  }

  private getManifestUrl() {
    return join(this.baseUrl, "manifest.yaml");
  }
  private getCourseUrl(slug: CourseSlug) {
    return join(this.baseUrl, `/courses/${slug}/course.yaml`);
  }
  private getLessonUrl(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    return join(
      this.baseUrl,
      `/courses/${courseSlug}/lesson/${lessonSlug}/lesson.yaml`,
    );
  }
}
