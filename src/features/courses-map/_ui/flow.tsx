"use client";
import { useCallback, useDeferredValue, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useReactFlow,
  OnNodesDelete,
  NodeDragHandler,
  SelectionDragHandler,
  Edge,
  useStore,
  ReactFlowState,
} from "reactflow";
import { CoursesMap } from "../_domain/projections";
import { customNodes } from "./nodes/custom-nodes";
import { getFlowNode } from "../_vm/data-prepare/flow-nodes/get-flow-node";
import { useMoveNode } from "../_vm/actions/use-move-node";
import { SafeLocalStorage } from "@/shared/lib/safe-local-storage";
import { z } from "zod";
import { useDeleteNode } from "../_vm/actions/use-delete-node";
import { ReactFlowNode } from "../_vm/data-prepare/flow-nodes/reactflow-node";

const viewportStorage = new SafeLocalStorage(
  "viewport",
  z.union([
    z.object({
      x: z.number(),
      y: z.number(),
      zoom: z.number(),
    }),
    z.undefined(),
  ]),
  undefined,
);

enum ZoomLevel {
  DETAILS = "details", // 5 - 1,
  NORMAL = "normal", // 1 - 0.5,
  FAR = "far", // 0.5 - 0.2,
  GLOBAL = "global", // 0.2 - 0.1,
}

export const MAX_ZOOM_LEVEL = 5;
export const MIN_ZOOM_LEVEL = 0.1;

const selectCurrentZoomLevel = (state: ReactFlowState) => {
  const zoom = state.transform[2];

  if (zoom < 0.2) {
    return ZoomLevel.GLOBAL;
  }

  if (zoom < 0.3) {
    return ZoomLevel.FAR;
  }

  if (zoom < 1) {
    return ZoomLevel.NORMAL;
  }

  return ZoomLevel.DETAILS;
};

export function Flow({ map }: { map: CoursesMap }) {
  const flow = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { move } = useMoveNode();
  const { deleteNode } = useDeleteNode();

  const onSave = useCallback(() => {
    const flowObj = flow.toObject();
    viewportStorage.set(flowObj.viewport);
  }, [flow]);

  const handleSelectionDragStop: SelectionDragHandler = useCallback(
    (_, nodes) => {
      console.log("selection drag stop", nodes);
      nodes.forEach((node) => {
        move({ x: node.position.x, y: node.position.y, id: node.id });
      });
    },
    [move],
  );

  const handleNodeDragStop: NodeDragHandler = useCallback(
    (_, __, nodes) => {
      nodes.forEach((node) => {
        move({ x: node.position.x, y: node.position.y, id: node.id });
      });
    },
    [move],
  );

  const handleNodesDelete: OnNodesDelete = useCallback(
    (nodes) => {
      nodes.forEach((node) => {
        deleteNode({ id: node.id });
      });
    },
    [deleteNode],
  );

  const zoomLevel = useDeferredValue(useStore(selectCurrentZoomLevel));

  useEffect(() => {
    setNodes((lastNodes) => {
      const lastNodesMap = new Map(lastNodes.map((node) => [node.id, node]));
      return map.nodeIds.map(
        (id) => {
          const node = map.nodes[id];
          return getFlowNode(node, lastNodesMap.get(node.id) as ReactFlowNode);
        },
        [map],
      );
    });

    setEdges((lastEdges) => {
      if (zoomLevel === ZoomLevel.GLOBAL || zoomLevel === ZoomLevel.FAR) {
        return [];
      }

      const lastEdgesMap = new Map(lastEdges.map((edge) => [edge.id, edge]));
      return map.edgeIds.map(
        (id) => {
          const lastEdge = lastEdgesMap.get(id);
          const edge = map.edges[id];
          return {
            ...lastEdge,
            id: edge.id,
            source: edge.source,
            target: edge.target,
            animated: true,
          } satisfies Edge;
        },
        [map],
      );
    });
  }, [setNodes, map, setEdges, zoomLevel]);

  return (
    <div className="absolute inset-0">
      <ReactFlow
        fitView={!viewportStorage.get()}
        defaultViewport={viewportStorage.get()}
        onlyRenderVisibleElements={true}
        onMoveEnd={onSave}
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        maxZoom={MAX_ZOOM_LEVEL}
        minZoom={MIN_ZOOM_LEVEL}
        onNodesDelete={handleNodesDelete}
        onNodeDragStop={handleNodeDragStop}
        onSelectionDragStop={handleSelectionDragStop}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={40} size={1} />
      </ReactFlow>
    </div>
  );
}
