import { ContainerModule } from "inversify";
import { Controller } from "@/kernel/lib/trpc/server";
import { CourseDetailsController } from "./_controller";

export const CoursesMapModule = new ContainerModule((bind) => {
  bind(Controller).to(CourseDetailsController);
});
