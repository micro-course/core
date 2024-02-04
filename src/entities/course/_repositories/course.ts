import { CourseId } from "../course";
import { courseIndexRepository } from "./course-index";

export class CourseRepository {
  async coursesList() {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.list;
  }

  async courseById(id: CourseId) {
    const index = await courseIndexRepository.getCoursesIndex();
    return index.byId[id];
  }
}

export const courseRepository = new CourseRepository();
