import { GetCourseService } from "@/entities/course/server";
import {
  CreateMapNodeCommand,
  CreateMapNodeService,
} from "@/entities/map/server";
import { injectable } from "inversify";
import { CoursesMapNode } from "../_domain/types";
import { createCourseNode } from "../_domain/factory";
import { TRPCError } from "@trpc/server";

export type CreateCoursesMapNodeCommand = CreateMapNodeCommand;

@injectable()
export class CreateCoursesMapNodeService {
  constructor(
    private getCourseByIdService: GetCourseService,
    private createMapNodeService: CreateMapNodeService,
  ) {}
  async exec(command: CreateCoursesMapNodeCommand): Promise<CoursesMapNode> {
    if (command.type === "course") {
      const course = await this.getCourseByIdService.exec({
        id: command.courseId,
      });

      if (!course) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Course ${command.courseId} not found`,
        });
      }

      const mapNode = await this.createMapNodeService.exec(command);

      if (mapNode.type !== "course") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return createCourseNode(mapNode, course);
    }

    const node = await this.createMapNodeService.exec(command);

    if (node.type !== "image") {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    return node;
  }
}
