import { createMapAbility } from "../_domain/ability";
import {
  CoursesMapNode,
  CoursesMapEdge,
  CoursesMap,
  MapEdgeId,
} from "../_domain/projections";
import { createMapNode } from "../_domain/mappers";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import { WithSession } from "@/entities/user/session.server";
import {
  MAP_NODE_TYPES,
  MapNodeEntity,
  MapNodeId,
} from "@/entities/map/map-node";
import { courseIndexRepository } from "@/entities/course/course.server";
import { CoursesIndex } from "@/entities/course/_domain/projections";
import { CourseId } from "@/entities/course/course";
import {
  StudentProgress,
  getCourseProgressPercent,
} from "@/entities/student-progress/student-progress";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";
import { UserId } from "@/kernel";

export class GetMapUseCase {
  async exec({ session }: Partial<WithSession>): Promise<CoursesMap> {
    const userId = session?.user.id;

    let { mapNodes, courseIndex, studentProgress } =
      await this.uploadData(userId);

    const ability = session ? createMapAbility(session) : undefined;

    if (!ability?.canViewHidenNodes()) {
      mapNodes = await this.filterHiddenNodes(mapNodes);
    }

    const map = await this.buildMap(mapNodes, courseIndex, studentProgress);

    return map;
  }

  private async buildMap(
    mapNodes: MapNodeEntity[],
    courseIndex: CoursesIndex,
    studentProgress?: StudentProgress,
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
          studentProgress
            ? getCourseProgressPercent(course, studentProgress)
            : undefined,
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
            source: courseIdNodeMap[dependencyId],
            target: nodeId,
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

  private async uploadData(userId?: UserId) {
    const [mapNodes, courseIndex, studentProgress] = await Promise.all([
      mapNodeRepository.getList(),
      courseIndexRepository.getCoursesIndex(),
      userId ? studentProgressRepository.getByStudentId(userId) : undefined,
    ]);

    return {
      mapNodes,
      courseIndex,
      studentProgress,
    };
  }
}

export const getMapUseCase = new GetMapUseCase();
