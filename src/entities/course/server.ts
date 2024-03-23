import { ContainerModule } from "inversify";
import { GetCoursesListService } from "./_services/get-courses-list";
import { CoursesRepository } from "./_repositories/course";

export const CourseEntityModule = new ContainerModule((bind) => {
  bind(GetCoursesListService).toSelf();
  bind(CoursesRepository).toSelf();
});

export { GetCoursesListService };
