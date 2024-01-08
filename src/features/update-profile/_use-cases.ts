import { Session } from "next-auth";
import { AuthorisationError } from "@/shared/lib/errors";
import { UpdateProfileCommand } from "./_domain";
import { createProfileAbility } from "@/entities/profile/domain";
import { profileRepository } from "@/entities/profile/repository";

export const updateProfile = async (
  { session }: { session: Session | null },
  { userId, ...data }: UpdateProfileCommand,
) => {
  const ability = createProfileAbility(session);

  if (!ability.canUpdateProfile(userId)) {
    new AuthorisationError();
  }

  const profile = await profileRepository.updateProfile(userId, data);

  return profile;
};
