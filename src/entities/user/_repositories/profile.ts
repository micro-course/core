import { dbClient } from "@/shared/lib/db";
import { Profile, UserId } from "../_domain/types";

export class ProfileRepository {
  async update(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    return await dbClient.user.update({
      where: { id: userId },
      data,
    });
  }
}

export const profileRepository = new ProfileRepository();
