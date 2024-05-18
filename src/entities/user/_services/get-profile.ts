import { UserId } from "@/kernel/domain/user";
import { profileRepository } from "../_repositories/profile";
import { Profile } from "../profile";

type GetUser = {
  userId: UserId;
};

export class GetProfileService {
  async exec({ userId }: GetUser): Promise<Profile> {
    return await profileRepository.getProfileByUserId(userId);
  }
}

export const getProfileService = new GetProfileService();
