import { CoursesRepository } from "../_repositories/course";
import { injectable } from "inversify";

@injectable()
export class GetCoursesListService {
  constructor(private coursesRepository: CoursesRepository) {}
  async exec() {
    return this.coursesRepository.coursesList();
  }
}
