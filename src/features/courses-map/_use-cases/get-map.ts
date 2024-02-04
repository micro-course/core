import { createMapAbility } from "../_domain/ability";
import { MapNode, MapEdge, Map } from "../_domain/projections";
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

export class GetMapUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canViewMap(),
  })
  async exec({ session }: WithSession): Promise<Map> {
    const ability = createMapAbility(session);

    let { mapNodes, courseIndex } = await this.uploadData();

    if (ability.canViewHidenNodes() === false) {
      mapNodes = await this.filterHiddenNodes(mapNodes);
    }

    const map = await this.buildMap(mapNodes, courseIndex);

    return map;
  }

  private async buildMap(
    mapNodes: MapNodeEntity[],
    courseIndex: CoursesIndex,
  ): Promise<Map> {
    const nodes: Record<MapNodeId, MapNode> = {};
    const nodeIds: MapNodeId[] = [];
    const edges: MapEdge[] = [];

    for (const mapNode of mapNodes) {
      if (mapNode.data.type === MAP_NODE_TYPES.COURSE) {
        const course = courseIndex.byId[mapNode.data.courseId];
        if (!course) {
          continue;
        }
        nodes[mapNode.id] = createMapNode(mapNode, course);
        nodeIds.push(mapNode.id);
      } else {
        nodes[mapNode.id] = createMapNode(mapNode, undefined);
        nodeIds.push(mapNode.id);
      }
    }

    return {
      edges,
      nodes,
      nodeIds,
    };
  }

  private async filterHiddenNodes(mapNodes: MapNodeEntity[]) {
    return mapNodes.filter((node) => {
      return !node.hidden;
    });
  }

  private async uploadData() {
    const [mapNodes, courseIndex] = await Promise.all([
      mapNodeRepository.getList(),
      courseIndexRepository.getCoursesIndex(),
    ]);

    return {
      mapNodes,
      courseIndex,
    };
  }
}

export const getMapUseCase = new GetMapUseCase();
