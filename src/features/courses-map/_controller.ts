import {
  router,
  Controller,
  publicProcedure,
  checkAbilityProcedure,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { GetCoursesMapService } from "./_services/get-courses-map";
import { createCoursesMapAbility } from "./_domain/ability";
import {
  UpdateMapNodeService,
  CreateMapNodeService,
  DeleteMapNodeService,
} from "@/entities/map/server";
import { revalidatePath } from "next/cache";
import {
  createCourseNodeCommandSchema,
  mapNodeIdSchema,
  updateCourseNodeCommandSchema,
} from "./_domain/schema";

@injectable()
export class CoursesMapController extends Controller {
  constructor(
    private getCoursesMapService: GetCoursesMapService,
    private deleteMapNodeService: DeleteMapNodeService,
    private createMapNodeService: CreateMapNodeService,
    private updateMapNodeService: UpdateMapNodeService,
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
      createNode: this.manageMapProcedure
        .input(createCourseNodeCommandSchema)
        .mutation(({ input }) => {
          revalidatePath("/map");
          return this.createMapNodeService.exec(input);
        }),
      updateNode: this.manageMapProcedure
        .input(updateCourseNodeCommandSchema)
        .mutation(({ input }) => {
          revalidatePath("/map");
          return this.updateMapNodeService.exec(input);
        }),
      deleteNode: this.manageMapProcedure
        .input(mapNodeIdSchema)
        .mutation(({ input }) => {
          revalidatePath("/map");
          return this.deleteMapNodeService.exec(input);
        }),
    }),
  });
}
