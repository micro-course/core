import { createMapAbility } from "../_domain/ability";
import { MapNodeProjection } from "../_domain/projections";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import {
  createImageMapNodeEntity,
  MapNodePosition,
  MapNodeDimensions,
  MapNodeSettings,
} from "@/entities/map/map-node";
import { createMapNodeProjection } from "../_domain/mappers";

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
  async exec(
    _: WithSession,
    command: AddImageNodeCommand,
  ): Promise<MapNodeProjection> {
    let entity = createImageMapNodeEntity(command);

    entity = await mapNodeRepository.save(entity);

    return createMapNodeProjection(entity);
  }
}

export const addImageNodeUseCase = new AddImageNodeUseCase();
