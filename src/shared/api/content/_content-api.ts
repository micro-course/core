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
import { loggedMethod } from "@/shared/lib/logger";

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

  @loggedMethod
  async fetchManifest() {
    const fetchData = async () => {
      const text = await this.d.fileFetcher.fetchText(this.getManifestUrl());
      return await this.d.contentParser.parse<Manifest>(text, manifestSchema);
    };
    return this.d.cacheStrategy.fetch(["manifest"], fetchData);
  }

  async fetchCourse(slug: CourseSlug) {
    const fetchData = async () => {
      const text = await this.d.fileFetcher.fetchText(this.getCourseUrl(slug));
      return await this.d.contentParser.parse<Course>(text, courseSchema);
    };
    return this.d.cacheStrategy.fetch(["course", slug], fetchData);
  }

  async fetchLesson(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    const fetchData = async () => {
      const text = await this.d.fileFetcher.fetchText(
        this.getLessonUrl(courseSlug, lessonSlug),
      );
      return await this.d.contentParser.parse<Lesson>(text, lessonSchema);
    };
    return this.d.cacheStrategy.fetch(
      ["lesson", courseSlug, lessonSlug],
      fetchData,
    );
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
