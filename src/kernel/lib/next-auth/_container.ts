import { CreateUserService } from "@/kernel/services/create-user";
import { createContainer } from "tiny-invert";

export const NextAuthContainer = createContainer<{
  nextAuth: {
    createUserService: CreateUserService;
  };
}>();
