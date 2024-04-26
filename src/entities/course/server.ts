import { ContainerModule } from "inversify";
import { GetCoursesListService } from "./_services/get-courses-list";
import { CoursesRepository } from "./_repositories/course";
import { GetCourseByIdService } from "./_services/get-course-by-id";
import { LessonRepository } from "./_repositories/lesson";
import { GetCourseLessonsService } from "./_services/get-course-lessons";

export const CourseEntityModule = new ContainerModule((bind) => {
  bind(GetCoursesListService).toSelf();
  bind(CoursesRepository).toSelf();
  bind(GetCourseByIdService).toSelf();
  bind(LessonRepository).toSelf();
  bind(GetCourseLessonsService).toSelf();
});

export { GetCoursesListService, GetCourseByIdService, GetCourseLessonsService };
