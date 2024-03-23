import { GetCoursesListService } from "@/entities/course/server";
import { publicProcedure, router, Controller } from "@/kernel/lib/trpc/server";
import { compileMDX } from "@/shared/lib/mdx/server";
import { injectable } from "inversify";

@injectable()
export class CoursesListController extends Controller {
  constructor(private getCoursesListService: GetCoursesListService) {
    super();
  }

  public router = router({
    corusesList: router({
      get: publicProcedure.query(async () => {
        const coursesList = await this.getCoursesListService.exec();

        const compiledCourses = await Promise.all(
          coursesList.map(async (course) => ({
            ...course,
            description: await compileMDX(course.description).then(
              (r) => r.code,
            ),
          })),
        );

        return compiledCourses;
      }),
    }),
  });
}
