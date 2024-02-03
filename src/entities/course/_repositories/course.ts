import { courseIndexRepository } from "./course-index";

export class CourseRepository {
  async coursesList() {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.list;
  }
}

export const courseRepository = new CourseRepository();
