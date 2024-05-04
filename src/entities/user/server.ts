import { ContainerModule } from "inversify";
import { GetProfileService } from "./_services/get-profile";
import { UpdateProfileService } from "./_services/update-profile";
import { ProfileRepository } from "./_repositories/profile";
import { CreateUserServiceImpl } from "./_services/create-user";
import { UserRepository } from "./_repositories/user";
import { CreateUserService } from "@/kernel/services/create-user";

export const UserEntityModule = new ContainerModule((bind) => {
  bind(GetProfileService).toSelf();
  bind(UpdateProfileService).toSelf();
  bind(ProfileRepository).toSelf();
  bind(UserRepository).toSelf();
  bind(CreateUserService).to(CreateUserServiceImpl);
});

export { UpdateProfileService, GetProfileService };
