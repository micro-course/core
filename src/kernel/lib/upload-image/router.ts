import { router, publicProcedure } from "@/kernel/lib/trpc/server";
import { z } from "zod";
import { uploadImageService } from "./_service";

export const uploadImageRouter = router({
  uploadImage: router({
    upload: publicProcedure
      .input(
        z.object({
          scope: z.string(),
          dataURI: z.string(),
          name: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        return uploadImageService.exec(input);
      }),
  }),
});

export type UploadImageRouter = typeof uploadImageRouter;
