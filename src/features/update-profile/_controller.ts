import {
  GetProfileService,
  UpdateProfileService,
} from "@/entities/user/server";
import {
  router,
  Controller,
  checkAbilityInputProcedure,
} from "@/kernel/lib/trpc/server";
import { injectable } from "inversify";
import { createProfileAbility } from "./_domain/ability";
import { z } from "zod";
import { profileSchema } from "@/entities/user/client";

const withUserIdSchema = z.object({
  userId: z.string(),
});

@injectable()
export class UpdateProfileController extends Controller {
  constructor(
    private updateProfileService: UpdateProfileService,
    private getProfileService: GetProfileService,
  ) {
    super();
  }

  public router = router({
    updateProfile: router({
      get: checkAbilityInputProcedure({
        create: createProfileAbility,
        input: withUserIdSchema,
        check: (ability, data) => ability.canGetProfile(data.userId),
      })
        .input(withUserIdSchema)
        .query(({ input }) => {
          return this.getProfileService.exec(input);
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
          return this.updateProfileService.exec(input);
        }),
    }),
  });
}
