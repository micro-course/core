import { ContainerModule } from "inversify";
import { CoursesMapController } from "./_controller";
import { GetCoursesMapService } from "./_services/get-courses-map";
import { Controller } from "@/kernel/lib/trpc/server";

export const CoursesMapModule = new ContainerModule((bind) => {
  bind(GetCoursesMapService).toSelf();
  bind(Controller).to(CoursesMapController);
});
