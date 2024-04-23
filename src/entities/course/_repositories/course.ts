import { Course } from "../_domain/types";
import { contentApi } from "@/shared/api/content";
import { logger } from "@/shared/lib/logger";
import { injectable } from "inversify";
import { allSuccess } from "@/shared/lib/promise";
import { CourseId, CourseSlug } from "@/kernel/domain/course";
@injectable()
export class CoursesRepository {
  coursesList = async (): Promise<Course[]> => {
    const manifest = await contentApi.fetchManifest();

    const fetchCourse = async (courseSlug: string): Promise<Course> => {
      const course = await contentApi.fetchCourse(courseSlug);

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        slug: courseSlug,
        image: course.image,
        thumbnail: course.thumbnail,
        dependencies: await allSuccess(
          course.dependencies?.map((slug) =>
            contentApi.fetchCourse(slug).then((r) => r.id),
          ) ?? [],
        ),
        shortDescription: course.shortDescription,
        product: course.product,
      };
    };

    return allSuccess(manifest.courses.map(fetchCourse), (value, i) => {
      if (value.status === "rejected") {
        logger.error({
          msg: "Course by slug not found",
          slug: manifest.courses[i],
          erorr: value.reason,
        });
      }
    });
  };

  async courseById(courseId: CourseId) {
    const list = await this.coursesList();
    return list.find((course) => course.id === courseId);
  }

  async courseSlug(courseSlug: CourseSlug) {
    const list = await this.coursesList();
    return list.find((course) => course.slug === courseSlug);
  }
}
