import { ContainerModule } from "inversify";
import { CoursesListController } from "./_controller";

export const CoursesListModule = new ContainerModule((bind) => {
  bind(CoursesListController).toSelf();
});

export { CoursesListController };
