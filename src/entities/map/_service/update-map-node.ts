import { injectable } from "inversify";
import { MapNodeRepository } from "../_repositories/map-node";
import { MapNode } from "../_domain/types";
import { MapNodeId } from "@/kernel/domain/map";
import { TRPCError } from "@trpc/server";

export type UpdateMapNodeCommand = { id: MapNodeId } & Partial<MapNode>;

@injectable()
export class UpdateMapNodeService {
  constructor(private mapNodeRepository: MapNodeRepository) {}
  async exec({ id, ...data }: UpdateMapNodeCommand) {
    const node = await this.mapNodeRepository.getNodeById(id);
    if (!node) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Map node ${id} not found`,
      });
    }

    if (data.type && data.type !== node.type) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Can not change node type`,
      });
    }

    const mapNode: MapNode = {
      ...node,
      ...(data as MapNode),
    };

    return await this.mapNodeRepository.saveNode(mapNode);
  }
}
