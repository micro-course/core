import {
  CreateMapNodeService,
  DeleteMapNodeService,
  UpdateMapNodeService,
} from "@/entities/map/server";
import {
  checkAbilityProcedure,
  Controller,
  publicProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createCoursesMapAbility } from "./_domain/ability";
import {
  createCourseNodeCommandSchema,
  mapNodeIdSchema,
  updateCourseNodeCommandSchema,
} from "./_domain/schema";
import { GetCoursesMapService } from "./_services/get-courses-map";
import { GetCoursesToAddService } from "./_services/get-courses-to-add";
import { UploadImageService } from "./_services/upload-image";

@injectable()
export class CoursesMapController extends Controller {
  constructor(
    private getCoursesMapService: GetCoursesMapService,
    private deleteMapNodeService: DeleteMapNodeService,
    private createMapNodeService: CreateMapNodeService,
    private updateMapNodeService: UpdateMapNodeService,
    private getCoursesToAddService: GetCoursesToAddService,
    private uploadImageService: UploadImageService,
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

      coursesToAdd: this.manageMapProcedure
        .input(z.object({ notFilterCourseId: z.string().optional() }))
        .query(async ({ input }) => {
          return this.getCoursesToAddService.exec(input);
        }),
      uploadImage: this.manageMapProcedure
        .input(
          z.object({
            dataURI: z.string(),
            name: z.string(),
          }),
        )
        .mutation(async ({ input }) => {
          return this.uploadImageService.exec(input);
        }),
    }),
  });
}
