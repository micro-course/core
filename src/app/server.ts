import "reflect-metadata";

import { CourseEntityModule } from "@/entities/course/server";
import { UserEntityModule } from "@/entities/user/server";
import { CoursesListModule } from "@/features/courses-list/server";
import { UpdateProfileModule } from "@/features/update-profile/server";
import { NextAuthModule } from "@/kernel/lib/next-auth/server";
import { Container } from "inversify";

export function createServer() {
  const container = new Container();

  container.load(
    NextAuthModule,
    CoursesListModule,
    CourseEntityModule,
    UserEntityModule,
    UpdateProfileModule,
  );

  return container;
}

export const server = createServer();
