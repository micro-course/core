import { UserId, SharedSession } from "@/kernel/domain/user";
import { injectable } from "inversify";
import { ProfileRepository } from "../_repositories/profile";
import { Profile } from "../client";

type GetUser = {
  userId: UserId;
  session: SharedSession;
};

@injectable()
export class GetProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async exec({ userId }: GetUser): Promise<Profile> {
    return await this.profileRepository.getProfileByUserId(userId);
  }
}
