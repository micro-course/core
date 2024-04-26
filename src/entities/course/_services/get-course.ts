import { CourseId, CourseSlug } from "@/kernel/domain/course";
import { CoursesRepository } from "../_repositories/course";
import { injectable } from "inversify";

type Query =
  | {
      id: CourseId;
    }
  | { slug: CourseSlug };

@injectable()
export class GetCourseService {
  constructor(private coursesRepository: CoursesRepository) {}
  async exec(query: Query) {
    if ("slug" in query) {
      return this.coursesRepository.courseSlug(query.slug);
    }
    return this.coursesRepository.courseById(query.id);
  }
}
