import { injectable } from "inversify";
import { TRPCError } from "@trpc/server";
import { MapNodeId } from "@/kernel/domain/map";
import { MapNodeRepository } from "../_repositories/map-node";

type DeleteMapNodeCommand = {
  id: MapNodeId;
};

@injectable()
export class DeleteMapNodeService {
  constructor(private mapNodeRepository: MapNodeRepository) {}
  async exec(command: DeleteMapNodeCommand) {
    const node = await this.mapNodeRepository.getNodeById(command.id);
    if (!node) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Map node ${command.id} not found`,
      });
    }
    await this.mapNodeRepository.deleteNode(command.id);
  }
}
