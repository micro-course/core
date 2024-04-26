import { GetCourseService } from "@/entities/course/server";
import {
  UpdateMapNodeCommand,
  UpdateMapNodeService,
} from "@/entities/map/server";
import { injectable } from "inversify";
import { CoursesMapNode } from "../_domain/types";
import { createCourseNode } from "../_domain/factory";
import { TRPCError } from "@trpc/server";
import { Course } from "@/entities/course";

export type UpdateCoursesMapNodeCommand = UpdateMapNodeCommand;

@injectable()
export class UpdateCoursesMapNodeService {
  constructor(
    private getCourseByIdService: GetCourseService,
    private updateMapNodeService: UpdateMapNodeService,
  ) {}
  async exec(command: UpdateCoursesMapNodeCommand): Promise<CoursesMapNode> {
    let course: Course | undefined = undefined;

    if (command.type && command.type === "course" && command.courseId) {
      course = await this.getCourseByIdService.exec({
        id: command.courseId,
      });

      if (!course) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Course ${command.courseId} not found`,
        });
      }
    }

    const mapNode = await this.updateMapNodeService.exec(command);

    if (mapNode.type === "course") {
      course ??= await this.getCourseByIdService.exec({
        id: mapNode.courseId,
      });

      if (!course) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return createCourseNode(mapNode, course);
    }

    return mapNode;
  }
}
