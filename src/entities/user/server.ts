import { ContainerModule } from "inversify";
import { CreateUserService } from "@/kernel/lib/next-auth/server";
import { GetProfileService } from "./_services/get-profile";
import { UpdateProfileService } from "./_services/update-profile";
import { ProfileRepository } from "./_repositories/profile";
import { CreateUserServiceImpl } from "./_services/create-user";
import { UserRepository } from "./_repositories/user";

export const UserEntityModule = new ContainerModule((bind) => {
  bind(GetProfileService).toSelf();
  bind(UpdateProfileService).toSelf();
  bind(ProfileRepository).toSelf();
  bind(UserRepository).toSelf();
  bind(CreateUserService).to(CreateUserServiceImpl);
});

export { UpdateProfileService, GetProfileService };
