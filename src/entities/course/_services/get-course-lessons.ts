import { CoursesRepository } from "../_repositories/course";
import { injectable } from "inversify";
import { LessonRepository } from "../_repositories/lesson";
import { CourseSlug } from "@/kernel/domain/course";

type Query = {
  courseSlug: CourseSlug;
};

@injectable()
export class GetCourseLessonsService {
  constructor(private lessonRepository: LessonRepository) {}
  async exec(query: Query) {
    return this.lessonRepository.courseLessons(query.courseSlug);
  }
}
