import { ContainerModule } from "inversify";
import { Controller } from "@/kernel/lib/trpc/server";
import { CourseDetailsController } from "./_controller";
import { GetCourseDetailsService } from "./_services/get-course-details";

export const CourseDetailsModule = new ContainerModule((bind) => {
  bind(GetCourseDetailsService).toSelf();
  bind(Controller).to(CourseDetailsController);
});
