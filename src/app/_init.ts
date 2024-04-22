import { CourseEntityModule } from "@/entities/course/server";
import { UserEntityModule } from "@/entities/user/server";
import { CoursesListModule } from "@/features/courses-list/server";
import { Container } from "inversify";

export function init() {
  const container = new Container();

  container.load(CoursesListModule, CourseEntityModule, UserEntityModule);

  return container;
}
