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
  ReactFlowProps,
} from "reactflow";
import { CoursesMap } from "../_domain/projections";
import { customNodes } from "./nodes/custom-nodes";
import { useMoveNode } from "../_vm/actions/use-move-node";
import { SafeLocalStorage } from "@/shared/lib/safe-local-storage";
import { z } from "zod";
import { useDeleteNode } from "../_vm/actions/use-delete-node";
import css from "./flow.module.css";
import { cn } from "@/shared/ui/utils";
import { getFlowNode } from "../_vm/flow/get-flow-node";
import { ReactFlowNode } from "../_vm/flow/reactflow-node";
import { useMapAbility } from "../_vm/use-map-ability";
import { MAP_NODE_TYPES } from "@/entities/map/map-node";

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

  if (zoom < 0.5) {
    return ZoomLevel.FAR;
  }

  if (zoom < 1) {
    return ZoomLevel.NORMAL;
  }

  return ZoomLevel.DETAILS;
};

export function Flow({ map }: { map: CoursesMap }) {
  const flow = useReactFlow();
  const ability = useMapAbility();
  const canManageNodes = ability.canMangeNodes();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

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
          return {
            ...getFlowNode(node, lastNodesMap.get(node.id) as ReactFlowNode),
            selectable: canManageNodes,
          } satisfies ReactFlowNode;
        },
        [map],
      );
    });

    setEdges((lastEdges) => {
      if (zoomLevel === ZoomLevel.GLOBAL) {
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
            className:
              ZoomLevel.FAR === zoomLevel ? css.largeEdge : css.mediumEdge,
          } satisfies Edge;
        },
        [map],
      );
    });
  }, [setNodes, map, setEdges, zoomLevel, canManageNodes]);

  const flowProps: ReactFlowProps = ability.canMangeNodes()
    ? {
        onNodesChange: onNodesChange,
        onNodesDelete: handleNodesDelete,
        onNodeDragStop: handleNodeDragStop,
        onSelectionDragStop: handleSelectionDragStop,
      }
    : {
        nodesDraggable: false,
      };

  return (
    <div className={cn("absolute inset-0 bg-slate-300/50 dark:bg-background")}>
      <ReactFlow
        fitView={!viewportStorage.get()}
        defaultViewport={viewportStorage.get()}
        maxZoom={MAX_ZOOM_LEVEL}
        minZoom={MIN_ZOOM_LEVEL}
        onlyRenderVisibleElements={true}
        onMoveEnd={onSave}
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodes}
        {...flowProps}
      >
        <Controls />
        <MiniMap
          nodeBorderRadius={4}
          className="bg-background/60 rounded shadow"
          maskColor="hsl(var(--primary) / 0.3)"
          nodeColor={(node) =>
            node.type === MAP_NODE_TYPES.IMAGE
              ? "transparent"
              : "hsl(var(--primary) / 0.8)"
          }
        />
        <Background variant={BackgroundVariant.Dots} gap={40} size={1} />
      </ReactFlow>
    </div>
  );
}
