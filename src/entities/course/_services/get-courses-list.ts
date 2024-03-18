import { CourseEntity } from "../_domain/types";
import { createId } from "@/shared/lib/id";
import { coursesRepository } from "../_repositories/course";
import { privateConfig } from "@/shared/config/private";

type GetCoursesList = {};

export class GetCoursesListService {
  async exec(data?: GetCoursesList) {
    return coursesRepository.getCoursesList();
  }
}

export const getCoursesListService = new GetCoursesListService();
