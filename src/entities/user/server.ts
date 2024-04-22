import { ContainerModule } from "inversify";
import { GetProfileService } from "./_services/get-profile";
import { UpdateProfileService } from "./_services/update-profile";
import { ProfileRepository } from "./_repositories/profile";

export const UserEntityModule = new ContainerModule((bind) => {
  bind(GetProfileService).toSelf();
  bind(UpdateProfileService).toSelf();
  bind(ProfileRepository).toSelf();
});

export { UpdateProfileService, GetProfileService };
