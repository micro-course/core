import { ContainerModule } from "inversify";
import { GetCoursesListService } from "./_services/get-courses-list";
import { CoursesRepository } from "./_repositories/course";
import { GetCourseService } from "./_services/get-course";
import { LessonRepository } from "./_repositories/lesson";
import { GetCourseLessonsService } from "./_services/get-course-lessons";

export const CourseEntityModule = new ContainerModule((bind) => {
  bind(GetCoursesListService).toSelf();
  bind(CoursesRepository).toSelf();
  bind(GetCourseService).toSelf();
  bind(LessonRepository).toSelf();
  bind(GetCourseLessonsService).toSelf();
});

export { GetCoursesListService, GetCourseService, GetCourseLessonsService };
