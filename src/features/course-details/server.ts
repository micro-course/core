import { ContainerModule } from "inversify";
import { Controller } from "@/kernel/lib/trpc/server";
import { CourseDetailsController } from "./_controller";
import { GetCourseDetailsService } from "./_services/get-course-details";
import { GetCourseActionService } from "./_services/get-course-action";

export const CourseDetailsModule = new ContainerModule((bind) => {
  bind(GetCourseDetailsService).toSelf();
  bind(GetCourseActionService).toSelf();
  bind(Controller).to(CourseDetailsController);
});
