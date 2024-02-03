import { createMapAbility } from "../_domain/ability";
import { MapNodeProjection } from "../_domain/projections";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import { MapNodeBase, MapNodeId } from "@/entities/map/map-node";
import { createMapNodeProjection } from "../_domain/mappers";
import { NotFoundError } from "@/shared/lib/errors";

export type UpdateBaseNodeCommand = {
  id: MapNodeId;
} & Partial<MapNodeBase>;

export class UpdateBaseNodeUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canMangeNodes(),
  })
  async exec(
    _: WithSession,
    command: UpdateBaseNodeCommand,
  ): Promise<MapNodeProjection> {
    const nodeEntity = await mapNodeRepository.getNodeById(command.id);

    if (!nodeEntity) {
      throw new NotFoundError();
    }

    Object.assign(nodeEntity, command);

    return createMapNodeProjection(await mapNodeRepository.save(nodeEntity));
  }
}

export const updateBaseNodeUseCase = new UpdateBaseNodeUseCase();
