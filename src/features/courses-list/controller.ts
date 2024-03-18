import {
  createPublicServerApi,
  publicProcedure,
  router,
} from "@/kernel/lib/trpc/server";
import { compileMDX } from "@/shared/lib/mdx/server";
import { getCoursesListService } from "@/entities/course/course.server";

export const coursesListController = router({
  corusesList: router({
    get: publicProcedure.query(async () => {
      const coursesList = await getCoursesListService.exec();

      const compiledCourses = await Promise.all(
        coursesList.map(async (course) => ({
          ...course,
          description: await compileMDX(course.description).then((r) => r.code),
        })),
      );

      return compiledCourses;
    }),
  }),
});

export type CoursesListController = typeof coursesListController;

export const coursesListServerApi = createPublicServerApi(
  coursesListController,
);
