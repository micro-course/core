import { injectable } from "inversify";
import { MapNodeRepository } from "../_repositories/map-node";

@injectable()
export class GetMapNodesService {
  constructor(private mapNodeRepository: MapNodeRepository) {}
  async exec() {
    return this.mapNodeRepository.getList();
  }
}
