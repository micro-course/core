import { join } from "path";
import manifestSchema from "./schemas/manifest.schema.json";
import courseSchema from "./schemas/course.schema.json";
import lessonSchema from "./schemas/lesson.schema.json";
import { CacheStrategy } from "./lib/cache-strategy";
import { ContentQuery } from "./lib/content-query";
import { FileFetcher } from "./lib/file-fetcher";
import { logFunction } from "@/shared/lib/logger";
import { pick } from "lodash-es";
import { Manifest } from "./schemas/manifest.schema";
import { Course } from "./schemas/course.schema";
import { Lesson } from "./schemas/lesson.schema";

export interface Options {
  baseUrl: string;
  token?: string;
}

export interface Dependencies {
  fileFetcher: FileFetcher;
  cacheStrategy: CacheStrategy;
  contentQuery: ContentQuery;
}

export class ContentApi {
  constructor(
    private options: Options,
    private dependencies: Dependencies,
  ) {}

  public async fetchManifest() {
    let manifestStringFetcher = () =>
      this.dependencies.fileFetcher.fetchFile(
        this.getManifestUrl(),
        this.options.token,
      );

    const manifestFetcher = () =>
      this.dependencies.contentQuery.fetchContentFile<Manifest>(
        manifestStringFetcher,
        manifestSchema,
      );

    return this.dependencies.cacheStrategy.fetch(
      ["manifest"],
      logFunction(
        {
          msg: "Fetch manifest",
        },
        manifestFetcher,
      ),
    );
  }

  async fetchCourse(courseSlug: string) {
    const courseStringFetcher = () =>
      this.dependencies.fileFetcher.fetchFile(
        this.getCourseUrl(courseSlug),
        this.options.token,
      );

    const courseFetcher = () =>
      this.dependencies.contentQuery.fetchContentFile<Course>(
        courseStringFetcher,
        courseSchema,
      );

    return this.dependencies.cacheStrategy.fetch(
      ["courses", courseSlug],
      logFunction(
        {
          msg: "Fetch course",
          logData: (res) => ({
            courseSlug,
            ...pick(res, ["id", "title"]),
          }),
        },
        courseFetcher,
      ),
    );
  }

  async fetchLesson(courseSlug: string, lessonSlug: string) {
    const lessonStringFetcher = () =>
      this.dependencies.fileFetcher.fetchFile(
        this.getLessonUrl(courseSlug, lessonSlug),
        this.options.token,
      );

    const lessonFetcher = async () =>
      await this.dependencies.contentQuery.fetchContentFile<Lesson>(
        lessonStringFetcher,
        lessonSchema,
      );

    return this.dependencies.cacheStrategy.fetch(
      ["lessons", courseSlug, lessonSlug],
      logFunction(
        {
          msg: "Fetch lesson",
          logData: (res) => ({
            courseSlug,
            lessonSlug,
            ...pick(res, ["id", "title"]),
          }),
        },
        lessonFetcher,
      ),
    );
  }

  getManifestUrl() {
    return join(this.options.baseUrl, `./manifest.yaml`);
  }

  getCourseUrl(courseSlug: string) {
    return join(this.options.baseUrl, `./courses/${courseSlug}/course.yaml`);
  }

  getLessonUrl(courseSlug: string, lessonSlug: string) {
    return join(
      this.options.baseUrl,
      `./courses/${courseSlug}/lessons/${lessonSlug}.yaml`,
    );
  }
}
