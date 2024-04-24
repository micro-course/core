import { ContainerModule } from "inversify";
import { Controller } from "@/kernel/lib/trpc/server";
import { CoursesMapController } from "./_controller";
import { GetCoursesMapService } from "./_services/get-courses-map";
import { UpdateCoursesMapNodeService } from "./_services/update-courses-map-node";
import { CreateCoursesMapNodeService } from "./_services/create-courses-map-node";

export const CoursesMapModule = new ContainerModule((bind) => {
  bind(GetCoursesMapService).toSelf();
  bind(UpdateCoursesMapNodeService).toSelf();
  bind(CreateCoursesMapNodeService).toSelf();
  bind(Controller).to(CoursesMapController);
});
