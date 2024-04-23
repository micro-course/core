import { ContainerModule } from "inversify";
import { MapNodeRepository } from "./_repositories/map-node";
import { GetMapNodesService } from "./_service/get-map-nodes";

export const MapEntityModule = new ContainerModule((bind) => {
  bind(MapNodeRepository).toSelf();
  bind(GetMapNodesService).toSelf();
});

export { GetMapNodesService };
