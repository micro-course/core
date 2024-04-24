import { ContainerModule } from "inversify";
import { MapNodeRepository } from "./_repositories/map-node";
import { GetMapNodesService } from "./_service/get-map-nodes";
import { DeleteMapNodeService } from "./_service/delete-map-node";

export const MapEntityModule = new ContainerModule((bind) => {
  bind(MapNodeRepository).toSelf();
  bind(GetMapNodesService).toSelf();
  bind(DeleteMapNodeService).toSelf();
});

export { GetMapNodesService, DeleteMapNodeService };
