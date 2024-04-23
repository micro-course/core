import { useNodesState } from "reactflow";
import { coursesMapApi } from "../../_api";
import { CoursesMapNode } from "../../_domain/types";
import { createFlowNode } from "./flow-node";

export function useNodes(defaultCoursesMap: CoursesMapNode[]) {
  const { data: coursesMap } = coursesMapApi.coursesMap.get.useQuery(
    undefined,
    {
      initialData: defaultCoursesMap,
    },
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    coursesMap.map((data) => createFlowNode(data)),
  );

  return { nodes, onNodesChange };
}
