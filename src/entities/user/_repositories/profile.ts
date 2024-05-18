import { dbClient } from "@/shared/lib/db";
import { Profile } from "../_domain/types";
import { profileSchema } from "../_domain/schema";
import { UserId } from "@/kernel/domain/user";
import { z } from "zod";

export class ProfileRepository {
  async update(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    const user = await dbClient.user.update({
      where: { id: userId },
      data,
    });

    return profileSchema.parse(user satisfies z.input<typeof profileSchema>);
  }

  async getProfileByUserId(userId: UserId): Promise<Profile> {
    const user = await dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    return profileSchema.parse(user satisfies z.input<typeof profileSchema>);
  }
}

export const profileRepository = new ProfileRepository();
