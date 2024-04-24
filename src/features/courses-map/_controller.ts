import {
  router,
  Controller,
  publicProcedure,
  authorizedProcedure,
  checkAbilityProcedure,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { GetCoursesMapService } from "./_services/get-courses-map";
import { createCoursesMapAbility } from "./_domain/ability";
import { DeleteMapNodeService } from "@/entities/map/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

@injectable()
export class CoursesMapController extends Controller {
  constructor(
    private getCoursesMapService: GetCoursesMapService,
    private deleteMapNodeService: DeleteMapNodeService,
  ) {
    super();
  }
  manageMapProcedure = checkAbilityProcedure({
    create: createCoursesMapAbility,
    check: (ablity) => ablity.canUpdateCoursesMap(),
  });

  public router = router({
    coursesMap: router({
      get: publicProcedure.query(() => {
        return this.getCoursesMapService.exec();
      }),
      deleteNode: this.manageMapProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => {
          revalidatePath("/map");
          return this.deleteMapNodeService.exec({ id: input.id });
        }),
    }),
  });
}
