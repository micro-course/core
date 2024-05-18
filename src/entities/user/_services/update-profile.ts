import { Profile } from "../_domain/types";
import { UserId } from "@/kernel/domain/user";
import { profileRepository } from "../_repositories/profile";

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
};

export class UpdateProfileService {
  constructor() {}

  async exec({ userId, data }: UpdateProfile): Promise<Profile> {
    return await profileRepository.update(userId, data);
  }
}

export const updateProfileService = new UpdateProfileService();
