import { ContainerModule } from "inversify";
import { CoursesListController } from "./_controller";
import { Controller } from "@/kernel/lib/trpc/server";

export const CoursesListModule = new ContainerModule((bind) => {
  bind(Controller).to(CoursesListController);
});

export { CoursesListController };
