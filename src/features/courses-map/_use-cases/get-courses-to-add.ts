import { createMapAbility } from "../_domain/ability";
import { CourseToAddProjection } from "../_domain/projections";
import { createCourseToAddProjection } from "../_domain/mappers";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import { MAP_NODE_TYPES, MapNodeEntity } from "@/entities/map/map-node";
import { courseIndexRepository } from "@/entities/course/course.server";
import { CourseEntity, CourseId } from "@/entities/course/course";

export class GetCoursesToAddUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canMangeNodes(),
  })
  async exec(_: WithSession): Promise<CourseToAddProjection[]> {
    const { nodes, courseIndex } = await this.uploadData();

    const { nodesByCourseId } = await this.getNodesByCourseIdMap(nodes);

    return this.filterCoursesWithoutNodes(
      courseIndex.list,
      nodesByCourseId,
    ).map(createCourseToAddProjection);
  }

  private filterCoursesWithoutNodes(
    courses: CourseEntity[],
    nodesByCourseId: Map<CourseId, MapNodeEntity>,
  ) {
    return courses.filter((course) => {
      const node = nodesByCourseId.get(course.id);
      if (!node) {
        return true;
      }
    });
  }

  private async getNodesByCourseIdMap(nodes: MapNodeEntity[]) {
    const nodesByCourseId = new Map<CourseId, MapNodeEntity>();

    nodes.forEach((node) => {
      if (node.data.type === MAP_NODE_TYPES.COURSE) {
        nodesByCourseId.set(node.data.courseId, node);
      }
    });

    return { nodesByCourseId };
  }

  private async uploadData() {
    const [nodes, courseIndex] = await Promise.all([
      mapNodeRepository.getList(),
      courseIndexRepository.getCoursesIndex(),
    ]);

    return {
      nodes,
      courseIndex,
    };
  }
}

export const getCoursesToAddUseCase = new GetCoursesToAddUseCase();
