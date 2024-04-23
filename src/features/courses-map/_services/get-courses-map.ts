import { GetCoursesListService } from "@/entities/course/server";
import { GetMapNodesService } from "@/entities/map/server";
import { injectable } from "inversify";
import { CoursesMapNode } from "../_domain/types";
import { arrayToRecord } from "@/shared/lib/record";
import { createCourseNode } from "../_domain/factory";
import { isDefined } from "@/shared/lib/assert";

@injectable()
export class GetCoursesMapService {
  constructor(
    private getCoursesListService: GetCoursesListService,
    private getMapNodesService: GetMapNodesService,
  ) {}
  async exec(): Promise<CoursesMapNode[]> {
    const courses = await this.getCoursesListService.exec();
    const corusesRecord = arrayToRecord("id", courses);
    const mapNodes = await this.getMapNodesService.exec();

    return mapNodes
      .map((mapNode) => {
        if (mapNode.type === "course") {
          const course = corusesRecord[mapNode.courseId];
          if (!course) return;
          return createCourseNode(mapNode, course);
        }

        if (mapNode.type === "image") {
          return mapNode;
        }

        return undefined;
      })
      .filter(isDefined);
  }
}
