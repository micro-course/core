import { createMapAbility } from "../_domain/ability";
import {
  CoursesMapNode,
  CoursesMapEdge,
  CoursesMap,
  MapEdgeId,
} from "../_domain/projections";
import { createMapNode } from "../_domain/mappers";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import {
  MAP_NODE_TYPES,
  MapNodeEntity,
  MapNodeId,
} from "@/entities/map/map-node";
import { courseIndexRepository } from "@/entities/course/course.server";
import { CoursesIndex } from "@/entities/course/_domain/projections";
import { CourseId } from "@/entities/course/course";
import { getCourseNodeProgress } from "../_domain/methods/get-course-node-progress";
import { StudentProgress } from "@/entities/student-progress/student-progress";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { UserId } from "@/kernel";

export class GetMapUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canViewMap(),
  })
  async exec({ session }: WithSession): Promise<CoursesMap> {
    const ability = createMapAbility(session);

    let { mapNodes, courseIndex, studentProgress } = await this.uploadData(
      session.user.id,
    );

    if (ability.canViewHidenNodes() === false) {
      mapNodes = await this.filterHiddenNodes(mapNodes);
    }

    const map = await this.buildMap(mapNodes, courseIndex, studentProgress);

    return map;
  }

  private async buildMap(
    mapNodes: MapNodeEntity[],
    courseIndex: CoursesIndex,
    studentProgress: StudentProgress,
  ): Promise<CoursesMap> {
    const nodes: Record<MapNodeId, CoursesMapNode> = {};
    const nodeIds: MapNodeId[] = [];
    const edges: Record<MapEdgeId, CoursesMapEdge> = {};
    const edgeIds: MapEdgeId[] = [];
    const courseIdNodeMap: Record<CourseId, MapNodeId> = {};

    for (const mapNode of mapNodes) {
      if (mapNode.data.type === MAP_NODE_TYPES.COURSE) {
        const course = courseIndex.byId[mapNode.data.courseId];
        if (!course) {
          continue;
        }
        nodes[mapNode.id] = createMapNode(
          mapNode,
          course,
          getCourseNodeProgress(course, studentProgress),
        );
        courseIdNodeMap[mapNode.data.courseId] = mapNode.id;
        nodeIds.push(mapNode.id);
      } else {
        nodes[mapNode.id] = createMapNode(mapNode, undefined, undefined);
        nodeIds.push(mapNode.id);
      }
    }

    for (const nodeId of nodeIds) {
      const node = nodes[nodeId];

      if (node.data.type === MAP_NODE_TYPES.COURSE) {
        node.data.dependencies.forEach((dependencyId) => {
          if (!courseIdNodeMap[dependencyId]) {
            return;
          }

          const id = `${nodeId}-${dependencyId}`;
          edgeIds.push(id);

          edges[id] = {
            id: `${nodeId}-${dependencyId}`,
            source: nodeId,
            target: courseIdNodeMap[dependencyId],
          };
        });
      }
    }

    return {
      edges,
      edgeIds,
      nodes,
      nodeIds,
      courseIdNodeMap,
    };
  }

  private async filterHiddenNodes(mapNodes: MapNodeEntity[]) {
    return mapNodes.filter((node) => {
      return !node.hidden;
    });
  }

  private async uploadData(userId: UserId) {
    const [mapNodes, courseIndex, studentProgress] = await Promise.all([
      mapNodeRepository.getList(),
      courseIndexRepository.getCoursesIndex(),
      studentProgressRepository.getByStudentId(userId),
    ]);

    return {
      mapNodes,
      courseIndex,
      studentProgress,
    };
  }
}

export const getMapUseCase = new GetMapUseCase();
