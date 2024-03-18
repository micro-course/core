import { compileMDX } from "@/shared/lib/mdx/server";
import { coursesRepository } from "../../entities/course/_repositories/course";
import { CoursesListClient } from "./_ui/courses-list";
import { coursesListServerApi } from "./controller";

export async function CoursesList() {
  const coursesList = await coursesListServerApi.corusesList.get.fetch();

  return <CoursesListClient defaultList={coursesList} />;
}
