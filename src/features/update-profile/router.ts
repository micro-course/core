import { router, checkAbilityInputProcedure } from "@/kernel/lib/trpc/server";
import { createProfileAbility } from "./_domain/ability";
import { z } from "zod";
import { profileSchema } from "@/entities/user/profile";
import {
  getProfileService,
  updateProfileService,
} from "@/entities/user/server";

const withUserIdSchema = z.object({
  userId: z.string(),
});

export const updateProfileRouter = router({
  updateProfile: router({
    get: checkAbilityInputProcedure({
      create: createProfileAbility,
      input: withUserIdSchema,
      check: (ability, data) => ability.canGetProfile(data.userId),
    })
      .input(withUserIdSchema)
      .query(({ input }) => {
        return getProfileService.exec(input);
      }),

    update: checkAbilityInputProcedure({
      create: createProfileAbility,
      input: withUserIdSchema,
      check: (ability, data) => ability.canUpdateProfile(data.userId),
    })
      .input(
        withUserIdSchema.extend({
          data: profileSchema.partial(),
        }),
      )
      .mutation(({ input }) => {
        return updateProfileService.exec(input);
      }),
  }),
});

export type UpdateProfileRouter = typeof updateProfileRouter;
