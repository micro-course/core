import { dbClient } from "@/shared/lib/db";
import { Profile } from "../_domain/types";
import { UserId } from "@/kernel/domain/user";

export class ProfileRepository {
  async update(userId: UserId, data: Partial<Profile>): Promise<Profile> {
    return await dbClient.user.update({
      where: { id: userId },
      data,
    });
  }
}

export const profileRepository = new ProfileRepository();
