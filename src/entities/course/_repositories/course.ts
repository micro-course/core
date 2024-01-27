import { cache } from "react";
import { CourseEntity } from "../_domain/types";
class CoursesRepository {
  getCoursesList = cache(async (): Promise<CourseEntity[]> => {
    return [
      {
        id: "asdf;kasldfja;s",
        slug: "hey",
        name: "name",
        description: "description",
      },
    ];
  });
}

export const coursesRepository = new CoursesRepository();
