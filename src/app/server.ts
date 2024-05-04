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
import { PaymentEntityModule } from "@/entities/payment/server";
import { CoursePurchaseModule } from "@/features/course-purchase/server";
import { UserAccessModule } from "@/entities/user-access/server";

export function createServer() {
  const container = new Container();

  container.load(
    NextAuthModule,
    CourseEntityModule,
    UserEntityModule,
    PaymentEntityModule,
    UpdateProfileModule,
    TrpcModule,
    MapEntityModule,
    CoursesMapModule,
    CourseDetailsModule,
    CoursePurchaseModule,
    UserAccessModule,
  );

  return container;
}

export const server = createServer();
