import { dbClient } from "@/shared/lib/db";
import { User } from "@prisma/client";

import { Profile } from "./domain";

export class ProfileRepository {
  async getProfile(userId: string): Promise<Profile | null> {
    const user = await dbClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return this.userToProfile(user);
  }

  async updateProfile(userId: string, profile: Partial<Profile>) {
    const user = await dbClient.user.update({
      where: {
        id: userId,
      },
      data: {
        ...profile,
      },
    });

    return this.userToProfile(user);
  }

  private userToProfile(user: User): Profile {
    return {
      userId: user.id,
      email: user.email ?? "",
      name: user.name ?? undefined,
      image: user.image ?? undefined,
    } satisfies Profile;
  }
}

export const profileRepository = new ProfileRepository();
