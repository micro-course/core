import { CourseEntityModule } from "@/entities/course/server";
import { CoursesListModule } from "@/features/courses-list/sever";
import { Container } from "inversify";

export function init() {
  const container = new Container();

  container.load(CoursesListModule, CourseEntityModule);

  return container;
}
