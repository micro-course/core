import { courseDbRepository } from "../_repositories/course-db";

type Query = {
  draft?: boolean;
};

class GetCoursesListService {
  async exec(query?: Query) {
    return courseDbRepository.getCourses(query);
  }
}

export const getCoursesListService = new GetCoursesListService();
