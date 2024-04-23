import { injectable } from "inversify";
import { MAP_NODE_TYPES, MapNode } from "../_domain/types";
import { dbClient } from "@/shared/lib/db";
import { MapNodeId } from "@/kernel/domain/map";
@injectable()
export class MapNodeRepository {
  constructor() {}

  async getList() {
    const mapNodes = await this.queryMapNodesList();
    return mapNodes.map((node) => this.mapNodeToEntity(node));
  }

  async getNodeById(id: MapNodeId) {
    const node = await this.queryMapNodeById(id);
    if (!node) {
      return undefined;
    }
    return this.mapNodeToEntity(node);
  }

  private mapNodeToEntity({
    id,
    imageData,
    courseData,
    ...nodeBase
  }: Awaited<ReturnType<typeof this.queryMapNodesList>>[number]): MapNode {
    const zIndex = nodeBase.zIndex ?? undefined;

    if (imageData) {
      return {
        id,
        ...nodeBase,
        zIndex,
        type: MAP_NODE_TYPES.IMAGE,
        src: imageData.src,
      };
    }

    if (courseData) {
      return {
        id,
        ...nodeBase,
        zIndex,
        type: MAP_NODE_TYPES.COURSE,
        courseId: courseData.courseId,
      };
    }
    throw new Error("Unknown map node type");
  }

  private queryMapNodeById(id: MapNodeId) {
    return dbClient.mapNode.findUnique({
      where: { id },
      include: {
        imageData: true,
        courseData: true,
      },
    });
  }

  private queryMapNodesList() {
    return dbClient.mapNode.findMany({
      include: {
        imageData: true,
        courseData: true,
      },
    });
  }
}
