import { CourseId, CourseSlug } from "@/kernel/domain/course";
import { courseDbRepository } from "../_repositories/course-db";
import { ImgUrl } from "@/kernel/domain/common";

export type UpsertCourseCommand = {
  id: CourseId;
  slug: CourseSlug;
  title: string;
  thumbnail: ImgUrl;
  image: ImgUrl;
};

class UpsertCourseService {
  async exec(command: UpsertCourseCommand) {
    return courseDbRepository.upsertCourseData({
      id: command.id,
      slug: command.slug,
      title: command.title,
      thumbnail: command.thumbnail,
      image: command.image,
    });
  }
}

export const upsertCourseService = new UpsertCourseService();
