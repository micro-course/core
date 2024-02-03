import { createMapAbility } from "../_domain/ability";
import { MapNodeProjection } from "../_domain/projections";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import {
  MapNodeSettings,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeId,
} from "@/entities/map/map-node";
import { createMapNodeProjection } from "../_domain/mappers";
import { NotFoundError } from "@/shared/lib/errors";

export type UpdateNodeCommand = {
  id: MapNodeId;
} & Partial<MapNodePosition & MapNodeDimensions & MapNodeSettings>;

export class UpdateNodeUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canMangeNodes(),
  })
  async exec(
    _: WithSession,
    command: UpdateNodeCommand,
  ): Promise<MapNodeProjection> {
    const nodeEntity = await mapNodeRepository.getNodeById(command.id);

    if (!nodeEntity) {
      throw new NotFoundError();
    }

    Object.assign(nodeEntity, command);

    return createMapNodeProjection(await mapNodeRepository.save(nodeEntity));
  }
}

export const updateNodeUseCase = new UpdateNodeUseCase();
