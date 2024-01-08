import { Session } from "next-auth";
import { createProfileAbility } from "./domain";
import { AuthorisationError } from "@/shared/lib/errors";
import { profileRepository } from "./repository";

export const getProfile = async (
  { session }: { session: Session | null },
  { userId }: { userId: string },
) => {
  const ability = createProfileAbility(session);

  if (!ability.canReadProfile(userId)) {
    throw new AuthorisationError();
  }

  const profile = await profileRepository.getProfile(userId);

  return profile;
};
