import { createMapAbility } from "../_domain/ability";
import { MapNode } from "../_domain/projections";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import {
  createImageMapNodeEntity,
  MapNodePosition,
  MapNodeDimensions,
  MapNodeSettings,
} from "@/entities/map/map-node";
import { createMapNode } from "../_domain/mappers";

export type AddImageNodeCommand = {
  src: string;
} & MapNodeDimensions &
  MapNodePosition &
  MapNodeSettings;

export class AddImageNodeUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canMangeNodes(),
  })
  async exec(_: WithSession, command: AddImageNodeCommand): Promise<MapNode> {
    let entity = createImageMapNodeEntity(command);

    entity = await mapNodeRepository.save(entity);

    return createMapNode(entity, undefined);
  }
}

export const addImageNodeUseCase = new AddImageNodeUseCase();
