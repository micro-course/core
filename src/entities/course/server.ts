import { ContainerModule } from "inversify";
import { GetCoursesListService } from "./_services/get-courses-list";
import { CoursesRepository } from "./_repositories/course";
import { GetCourseByIdService } from "./_services/get-course-by-id";

export const CourseEntityModule = new ContainerModule((bind) => {
  bind(GetCoursesListService).toSelf();
  bind(CoursesRepository).toSelf();
  bind(GetCourseByIdService).toSelf();
});

export { GetCoursesListService, GetCourseByIdService };
