import { injectable } from "inversify";
import { MapNodeRepository } from "../_repositories/map-node";
import {
  CourseMapNodeData,
  ImageMapNodeData,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeSettings,
  MapNode,
} from "../_domain/types";
import { createId } from "@/shared/lib/id";
import { getZIndex } from "../_domain/methods";

export type CreateMapNodeCommand = (MapNodeDimensions &
  MapNodePosition &
  MapNodeSettings) &
  (CourseMapNodeData | ImageMapNodeData);

@injectable()
export class CreateMapNodeService {
  constructor(private mapNodeRepository: MapNodeRepository) {}
  async exec(command: CreateMapNodeCommand) {
    const mapNode: MapNode = {
      id: createId(),
      ...command,
      zIndex: getZIndex(command.type, command.zIndex),
    };

    return await this.mapNodeRepository.saveNode(mapNode);
  }
}
