import { GetCoursesListService } from "@/entities/course/server";
import { GetMapNodesService } from "@/entities/map/server";
import { injectable } from "inversify";
import { arrayToRecord } from "@/shared/lib/record";
import { CourseId } from "@/kernel/domain/course";
import { Course } from "@/entities/course";
import { CourseMapNode, MAP_NODE_TYPES } from "@/entities/map";

type GetCoursesToAddQuery = {
  notFilterCourseId?: CourseId;
};

@injectable()
export class GetCoursesToAddService {
  constructor(
    private getCoursesListService: GetCoursesListService,
    private getMapNodesService: GetMapNodesService,
  ) {}
  async exec(query: GetCoursesToAddQuery): Promise<Course[]> {
    const courses = await this.getCoursesListService.exec();
    const mapNodes = await this.getMapNodesService.exec();
    const coursesMapNodes = mapNodes.filter(
      (mapNode): mapNode is CourseMapNode =>
        mapNode.type === MAP_NODE_TYPES.COURSE,
    );
    const mapNodesByCourseIdRecord = arrayToRecord("courseId", coursesMapNodes);

    return courses.filter((course) => {
      if (query.notFilterCourseId && query.notFilterCourseId === course.id) {
        return true;
      }
      return !mapNodesByCourseIdRecord[course.id];
    });
  }
}
