import { CourseId } from "@/kernel/domain/course";
import { CoursesRepository } from "../_repositories/course";
import { injectable } from "inversify";

type GetCourseByIdQuery = {
  id: CourseId;
};

@injectable()
export class GetCourseByIdService {
  constructor(private coursesRepository: CoursesRepository) {}
  async exec(query: GetCourseByIdQuery) {
    return this.coursesRepository.courseById(query.id);
  }
}
