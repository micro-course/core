import { createMapAbility } from "../_domain/ability";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import { MapNodeId } from "@/entities/map/map-node";
import { MapNodeProjection } from "../_domain/projections";
import { createMapNodeProjection } from "../_domain/mappers";
import { NotFoundError } from "@/shared/lib/errors";

export type DeleteNodeCommand = {
  id: MapNodeId;
};

export class DeleteNodeUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canMangeNodes(),
  })
  async exec(
    _: WithSession,
    command: DeleteNodeCommand,
  ): Promise<MapNodeProjection> {
    const node = await mapNodeRepository.getNodeById(command.id);
    if (!node) {
      throw new NotFoundError();
    }
    await mapNodeRepository.delete(command.id);

    return createMapNodeProjection(node);
  }
}

export const deleteNodeUseCase = new DeleteNodeUseCase();
