import { router, checkAbilityProcedure } from "@/kernel/lib/trpc/server";
import { createCmsAbility } from "./_domain/ability";
import {
  UpsertCourseCommand,
  deleteCourseService,
  getCoursesListService,
  upsertCourseService,
} from "@/entities/course/server";
import { SchemaOf } from "@/shared/lib/zod";
import { ImgUrl } from "@/kernel/domain/common";
import { z } from "zod";
import { CourseId, CourseSlug } from "@/kernel/domain/course";

const cmsProcedure = checkAbilityProcedure({
  create: createCmsAbility,
  check: (ability) => ability.canManageCourses(),
});

export const cmsRouter = router({
  crm: router({
    getCoursesList: cmsProcedure.query(() => {
      return getCoursesListService.exec();
    }),
    upsertCourse: cmsProcedure
      .input(
        z.object({
          id: CourseId,
          slug: CourseSlug,
          title: z.string(),
          thumbnail: ImgUrl,
          image: ImgUrl,
        }) satisfies SchemaOf<UpsertCourseCommand>,
      )
      .mutation(({ input }) => {
        return upsertCourseService.exec(input);
      }),
    deleteCourse: cmsProcedure
      .input(
        z.object({
          id: CourseId,
        }),
      )
      .mutation(({ input }) => {
        return deleteCourseService.exec(input);
      }),
  }),
});

export type CmsRouter = typeof cmsRouter;
