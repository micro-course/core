import { MapNodeProjection } from "../../../_domain/projections";
import { ReactFlowNode } from "./reactflow-node";

export const getFlowNode = (node: MapNodeProjection): ReactFlowNode => {
  return {
    id: node.id,
    type: node.data.type,
    zIndex: node.zIndex,
    position: node,
    data: node,
  };
};
