import { cachedAsyncMethod, invalidateCache } from "@/shared/lib/cache";
import { dbClient } from "@/shared/lib/db";
import { mapNodesCacheStrategy } from "./cache-strategy";
import { MAP_NODE_TYPES, MapNodeEntity, MapNodeId } from "../_domain/entities";

export class MapNodeRepository {
  constructor() {}

  @cachedAsyncMethod(mapNodesCacheStrategy, () => ["map-node", "list"])
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

  @invalidateCache(mapNodesCacheStrategy, (_) => ["map-node", "list"])
  async save(entity: MapNodeEntity) {
    const mapNode = await this.queryUpsertNode(entity);
    return this.mapNodeToEntity(mapNode);
  }

  @invalidateCache(mapNodesCacheStrategy, (_) => ["map-node", "list"])
  async delete(id: MapNodeId) {
    await dbClient.mapNode.delete({ where: { id } });
  }

  private mapNodeToEntity({
    id,
    imageData,
    courseData,
    ...nodeBase
  }: Awaited<
    ReturnType<typeof this.queryMapNodesList>
  >[number]): MapNodeEntity {
    const zIndex = nodeBase.zIndex ?? undefined;

    if (imageData) {
      return {
        id,
        ...nodeBase,
        zIndex,
        data: {
          type: MAP_NODE_TYPES.IMAGE,
          src: imageData.src,
        },
      };
    }

    if (courseData) {
      return {
        id,
        ...nodeBase,
        zIndex,
        data: {
          type: MAP_NODE_TYPES.COURSE,
          courseId: courseData.courseId,
        },
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

  private queryUpsertNode({ id, data, ...fields }: MapNodeEntity) {
    return dbClient.mapNode.upsert({
      where: {
        id,
      },
      create: {
        ...fields,
        imageData:
          data.type === MAP_NODE_TYPES.IMAGE
            ? {
                create: {
                  src: data.src,
                },
              }
            : undefined,
        courseData:
          data.type === MAP_NODE_TYPES.COURSE
            ? {
                create: {
                  courseId: data.courseId,
                },
              }
            : undefined,
      },
      update: {
        ...fields,
        imageData:
          data.type === MAP_NODE_TYPES.IMAGE
            ? {
                update: {
                  src: data.src,
                },
              }
            : undefined,
        courseData:
          data.type === MAP_NODE_TYPES.COURSE
            ? {
                update: {
                  courseId: data.courseId,
                },
              }
            : undefined,
      },
      include: {
        imageData: true,
        courseData: true,
      },
    });
  }
}

export const mapNodeRepository = new MapNodeRepository();
