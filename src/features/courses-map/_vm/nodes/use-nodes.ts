import { useNodesState } from "reactflow";
import { coursesMapApi } from "../../_api";
import { CoursesMapNode } from "../../_domain/types";
import { createFlowNode, FlowNode } from "./flow-node";
import { useCoursesMapAblity } from "../lib/use-courses-map-ability";
import { useEffect } from "react";

export function useNodes(defaultCoursesMap: CoursesMapNode[]) {
  const ability = useCoursesMapAblity();
  const { data: coursesMap } = coursesMapApi.coursesMap.get.useQuery(
    undefined,
    {
      initialData: defaultCoursesMap,
      enabled: !!ability?.canUpdateCoursesMap(),
    },
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<CoursesMapNode>(
    coursesMap.map((data) => createFlowNode(data)),
  );

  useEffect(() => {
    setNodes((lastNodes) => {
      const map = new Map(lastNodes.map((node) => [node.id, node]));
      return coursesMap.map((newNode) =>
        createFlowNode(newNode, map.get(newNode.id) as FlowNode),
      );
    });
  }, [coursesMap, setNodes]);

  return { nodes, onNodesChange };
}
