import "reflect-metadata";

import { CourseEntityModule } from "@/entities/course/server";
import { UserEntityModule } from "@/entities/user/server";
import { UpdateProfileModule } from "@/features/update-profile/server";
import { NextAuthModule } from "@/kernel/lib/next-auth/server";
import { Container } from "inversify";
import { TrpcModule } from "@/kernel/lib/trpc/server";
import { MapEntityModule } from "@/entities/map/server";
import { CoursesMapModule } from "@/features/courses-map/server";
import { CourseDetailsModule } from "@/features/course-details/server";

export function createServer() {
  const container = new Container();

  container.load(
    NextAuthModule,
    CourseEntityModule,
    UserEntityModule,
    UpdateProfileModule,
    TrpcModule,
    MapEntityModule,
    CoursesMapModule,
    CourseDetailsModule,
  );

  return container;
}

export const server = createServer();
