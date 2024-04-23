import { router, Controller, publicProcedure } from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { GetCoursesMapService } from "./_services/get-courses-map";

@injectable()
export class CoursesMapController extends Controller {
  constructor(private getCoursesMapService: GetCoursesMapService) {
    super();
  }

  public router = router({
    coursesMap: router({
      get: publicProcedure.query(() => {
        return this.getCoursesMapService.exec();
      }),
    }),
  });
}
