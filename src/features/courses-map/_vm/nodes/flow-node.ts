import { Node } from "reactflow";
import { CoursesMapNode } from "../../_domain/types";

export type FlowNode = Node<CoursesMapNode, CoursesMapNode["type"]>;

export const createFlowNode = (
  node: CoursesMapNode,
  lastFlowNode?: FlowNode,
): FlowNode => ({
  ...lastFlowNode,
  id: node.id,
  type: node.type,
  zIndex: node.zIndex,
  position: node,
  data: node,
});
